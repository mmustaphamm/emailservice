import amqp from "amqplib"
//import { SendEmail } from "../../utils/email.utils";
import { SendEmail } from "../../email/email.controller";

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';
const queueName = process.env.RABBITMQ_QUEUE_NAME || "EmailService"



async function consumePayoutQueue() {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: false});

    channel.consume(queueName, async (message) => {
        if (message !== null) {
            console.log({ message: JSON.parse(message.content.toString() )});
            const {to, cc, bcc, subject, messageBody } = JSON.parse(message.content.toString());
            await SendEmail.sendEmail(to, cc, bcc, subject, messageBody)
            channel.ack(message);
        } else {
            console.log('Consumer cancelled by server')
        }
    });

  } catch (error) {
    console.log('error consuming the queues', error);
  }
}

export default consumePayoutQueue

