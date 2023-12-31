import amqp from "amqplib"


const queueName = process.env.RABBITMQ_QUEUE_NAME || "EmailService"
const amqpurl = process.env.RABBITMQ_URL || 'amqp://localhost:5672'

export class AssertMessage {
    static async assertMsg (payload:any) {
        try{
            const connection = await amqp.connect(amqpurl);
            const channel = await connection.createChannel();
            channel.assertQueue(queueName, {durable: false});
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
        }catch(error){
            console.log('There was error asserting message', error)
        }
    }
}
