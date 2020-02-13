const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyparse = require('body-parser');

const app = express();
var urlbodyparse = bodyparse.urlencoded({extended:false});

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res,next)=>{
   res.render('contact'); 

});

app.post('/contact',urlbodyparse,(req,res,next)=>{
    const output = `
    <p>You have a new Message</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Subject: ${req.body.subject}</li>
      <li>Email: ${req.body.email}</li>
     
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
   `;
   
   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: '',// mail.domain.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '', // username
        pass: ''  // username password
    },
    tls:{
      rejectUnauthorized:false
    }
   });
   
   // setup email data with unicode symbols
   let mailOptions = {
      from: req.body.email, // sender address
      to: '', // email to send to
      subject: req.body.subject, // Subject line
      text: 'Email?', // plain text body
      html: output // html body
   };
   
   // send mail with defined transport object
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
   
   
      res.render('email-send', {message_send:'Thank you for sending us an Email we will get back to you soon'});
         
   });
   })
 



app.listen(200);