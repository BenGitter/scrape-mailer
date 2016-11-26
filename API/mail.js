var nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = function(to, deal, done){
  var transporter = nodemailer.createTransport(process.env.SMTP_LINK);
  var html =  "Hi, <br><br>Today's free ebook on Packtpub is " + 
              "<a href='https://www.packtpub.com/packt/offers/free-learning'>" +
                "<b>" + deal + "</b>" +
              "</a>. <br><br>" +
              "Have a nice day!";
  var text = "In case HTML doesn't work: Today's deal is " + deal + ".";
  var subject = "Daily Deal";

  var mailOptions = {
    from: "Daily Deal Mail <daily-deal@outlook.com>",
    to: "<" + to + ">",
    subject: subject,
    text: text,
    html: html
  };

  // Send mail
  transporter.sendMail(mailOptions, function(err, info){
    if(err) return done(err);
    
    return done(null, info);
  });

}