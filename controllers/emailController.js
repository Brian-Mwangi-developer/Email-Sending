const asyncHandler = require("express-async-handler");
const { generateEmailBody, sendEmail } = require('../helper/emailhelper');
const { Notification } = require('../constants/constants');

const emailSender = asyncHandler (async (req, res) => {
    const { info, type, sendTo } = req.body;

    if (!info || !type || !sendTo) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let emailContent;
        let attachments = {}; // For documents type
        switch (type) {
            case Notification.NEW_ORDER_RECEIVED:
            
                emailContent = await generateEmailBody(info, type);
                break;
            case  Notification.DOCUMENTS:
                emailContent = await generateEmailBody(info, type,attachments);
                if(req.files && req.files.mpesaStatement && req.files.idPicture){
                    attachments.mpesaStatement = {
                        filename: req.files.mpesaStatement[0].originalname,
                        path: req.files.mpesaStatement[0].path,
                    };

                    attachments.idPicture = {
                        filename: req.files.idPicture[0].originalname,
                        path: req.files.idPicture[0].path,
                    };
                }else {
                    return res.status(400).json({ message: 'No attachments found' });
                }
                break;
            default:
                return res.status(400).json({ message: 'Invalid notification type' });
        }

        const result = await sendEmail(emailContent, sendTo, attachments);
        res.status(200).json({ message: 'Email sent successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

module.exports = emailSender;