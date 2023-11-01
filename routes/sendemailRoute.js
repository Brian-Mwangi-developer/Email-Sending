const express = require('express');
const { upload } = require('../helper/fileUpload');
const { sendEmail } = require('../controllers/sendEmailcontroller');

const router = express.Router();

router.post('/mail', upload.array('files',3), sendEmail);

module.exports = router