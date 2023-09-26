import { Request, Response } from "express";
import { EmailService } from "./email.service";

export class EmailController {
    static async SendEmail(req:Request, res:Response) {
        try {
            await EmailService.sendEmail(req.body)
            res.status(200).json({message: "Message has been sent successfully, check your inbox"})
        } catch (error) {
            console.log("error sending mail", error)
            return res.status(500).json({ message: 'Internal Server Error', error }) 
        }
    }
}