// const nodemailer = require('nodemailer');

// const generateEmailBody = async (info, type,attachments) => {
//     let subject = '';
//     let body = '';
//     switch (type) {
//         case "NEW_ORDER_RECEIVED":
//             subject = "New Order Received";
//             body = `
//             <div>
//               <p>A new order has been received.</p>
//               <p>Order #${info.order.number} (placed on ${info.order.date_placed}) contains:</p>
//               <!-- Loop through order lines -->
//               <ul>
//                 ${info.order.lines.map(line => `<li>${line.product} - quantity: ${line.quantity}</li>`).join('')}
//               </ul>
//               <p>Order Total: ${info.order.total_incl_tax} ${info.order.currency}</p>
//               <p>Customer details:</p>
//               <ul>
//                 <li>Full name: ${info.aspira.full_name}</li>
//                 <li>National ID: ${info.aspira.national_id_number}</li>
//                 <li>Telephone: ${info.aspira.telephone_number}</li>
//                 <li>Email: ${info.order.email}</li>
//               </ul>
//             </div>
//             `;
//             break;
//         case 'DOCUMENTS':
//             subject = 'Mpesa Statement and ID Picture for Aspira';
//             body = `
//                 <div>
//                 <p>Statement for Mpesa and ID Picture:</p>
//                 <!-- Add the Mpesa statement PDF and ID picture here -->
//                 ${attachments && attachments.length > 0 ? '<p>Documents attached:</p><ul>' + attachments.map(attachment => `<li>${attachment.filename}</li>`).join('') + '</ul>' : ''}
//                 </div>
//                 `;
//             break;
//         default:
//             throw new Error("Invalid notification type.");
//     }

//     return { subject, body,attachments };
// };

// const transporter = nodemailer.createTransport({
//     pool: true,
//     service: 'hotmail',
//     port: 2525,
//     auth: {
//         user: process.env.EMAIL_ADDRESS,
//         pass: process.env.EMAIL_PASSWORD,
//     },
//     maxConnections: 1
// });

// function sendEmail(emailContent, sendTo) {
//     const mailOptions = {
//         from: process.env.EMAIL_ADDRESS,
//         to: sendTo,
//         html: emailContent.body,
//         subject: emailContent.subject,
//         attachments:emailContent.attachments,// For documents type
//     };
//     return new Promise(function (resolve, reject) {
//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.error(error);
//                 reject('Failed to send email');
//             } else {
//                 console.log('Email sent', info);
//                 resolve(info);
//             }
//         });
//     });
// }

// module.exports = {
//     sendEmail, generateEmailBody
// };