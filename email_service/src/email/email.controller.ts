import nodemailer from "nodemailer"

export class SendEmail {

  static async distributeEmails() {
    
  }
  static async sendEmail(to, cc, bcc, subject, messageBody) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
          user: 'lordlonso17@gmail.com',
          pass: 'yxfdtrkplusfojns',
        },
      });

      const mailOptions = {
        from: 'lordlonso17@gmail.com',
        to: to,
        cc: cc,
        bcc: bcc,
        subject: `${subject}`,
        text: `Your OTP is: ${messageBody}`,
      };

     const sent =  await transporter.sendMail(mailOptions);
     if (!sent) console.log('problem sending message');
     return 'Messgae show';
    } catch (error) {
      console.error('Nodemailer error:', error);
      throw error;
    }
  }
}
