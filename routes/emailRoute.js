const express = require("express");
const emailSender = require("../controllers/emailController");
const router = express.Router();


router.post('/send-email',emailSender);

module.exports =router;