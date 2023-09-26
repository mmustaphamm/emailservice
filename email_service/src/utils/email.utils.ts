import nodemailer from "nodemailer"
import { IMailOptions } from "../email/interface/email.interface";


export class SendEmail {
  static async sendEmail(email: string, otp:any) {
    const user = process.env.TRANSPORTER_USER as string
    const pass = process.env.TRANSPORTER_USER as string
    const service = process.env.TRANSPORTER_SERVICE as string
    try {
      const transporter = nodemailer.createTransport({
        service: service,
        secure: true,
        auth: {
          user: user,
          pass: pass,
        },
      });

      const mailOptions:IMailOptions = {
        from: user,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
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
