
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = (req, res)=>{
    console.log("sending....")
    try{
        const  { name, email,phoneNumber,nationalId,productId, productName}= req.body;
        const files = req.files

        console.log(req.body)
        console.log(files)
        // let attachments = [];

        // // Add files to attachments array
        // if (files && Array.isArray(files)) {
        //     attachments = files.map(file => ({
        //         filename: file.originalname,
        //         content: file.buffer
        //     }));
        // }
        
        let mailOptions = {
            from        : process.env.EMAIL_ADDRESS,
            to          : "exampleme999@gmail.com",
            subject     : `Application for${nationalId}`,
            html        : ` 
                            <div>
                                <p>Name: ${name}</p>
                                <p>NationalId: ${nationalId}</p>
                                <p>Email address: ${email}</p>
                                <p>productID: ${productId}</p>
                                <p>productName: ${productName}</p>
                                <p>Phone Number: ${phoneNumber}</p>
                            </div>
                            `,
            attachments : files
        }
        transporter.sendMail(mailOptions, (err, data ) => {
            if(err){
                res.json({
                    message: err
                }).status(400)
                console.log(err)
            }else{
                res.json({
                    status: "success"
                }).status(200)
    
                console.log("Email Sent" + data.response)
            }
        })

    }catch(error){
        res.status(400).send(error)
    }

    
}

module.exports = { sendEmail }