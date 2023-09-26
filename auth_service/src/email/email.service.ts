import { sendEmailValidator } from "../validators/validators";
import { AssertMessage } from "../common/rabbitMq/rabbbitMqPublisher";
import { Exception } from "../auth/interface/users.interface";
import { MesssageStructure } from "../auth/interface/users.interface";
import { Outbox } from "./outbox.entity";
import { AppDataSource } from "../data-source";


export class EmailService {
    static async sendEmail(sendmailOptions:MesssageStructure) {
        try { 
            const {error, value} = sendEmailValidator(sendmailOptions)
            if (error) {
                console.log(error.details[0].message)
                throw new Exception(400, error.details[0].message)
            }

            const {to, cc, bcc, subject, messageBody} = value

            const email = new Outbox();
            email.to = to;
            email.cc = cc;
            email.bcc = bcc;
            email.subject = subject;
            email.messageBody = messageBody;

           
            await this.saveEmailToOutbox(email)
            await AssertMessage.assertMsg({to, cc, bcc, subject, messageBody})

            await this.updateOutboxSentStatus(email)

            return "message sent to queue successfully"
        } catch (error) {
            console.log('error sending message to queue', error)
           throw new Exception(400, `sending mail ${error}`);
        }
    }

    static async saveEmailToOutbox(email:Outbox): Promise<Outbox> {
        try {
          const emailBoxRepository = AppDataSource.getRepository(Outbox)
          return await emailBoxRepository.save(email);
        } catch (error) {
          console.error('Error saving email to Outbox:', error);
          throw new Exception(400, "Error Saving to outbox");
        }
      }

      static async updateOutboxSentStatus(email: Outbox): Promise<void> {
        try {
            const emailBoxRepository = AppDataSource.getRepository(Outbox);
            email.sent = true
            await emailBoxRepository.save(email);
        } catch (error) {
            console.error('Error updating sent status in Outbox:', error);
            throw new Exception(400, "Error updating sent status in outbox");
        }
    }
      
}