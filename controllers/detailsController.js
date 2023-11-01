const asyncHandler = require("express-async-handler");
const {sendSMS} = require("../helper/smshelper")
const formData = require("express-form-data");
const os = require("os");

const getDetails =asyncHandler(async(req,res)=>{
    console.log(req.fields)
    console.log(req.files)
    const {email,phoneNumber,productId,productName,nationalId} = req.fields
    if (!phoneNumber) {
        return res.status(400).json({
            status: "error",
            message: "Phone Number is required"
        });
    }
    // Call the sendSMSMiddleware
    try {
        // Set up the SMS message
        const message = `Hello ${nationalId}, your payment is being processed for product ${productName}.`;

        // Send SMS using the helper function
        const smsResult = await sendSMS(phoneNumber, message);

        res.status(200).json({
            status: "success",
            message: "Details entered successfully and payment processing message sent",
            smsResult
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("An error occurred while sending SMS");
    }
})

module.exports ={getDetails}