const express = require('express')
const app = express();
const PORT = 5002;
const amqp = require('amqplib')
let channel , connection;

amqp.connect();
async function connect() {
    try {
        const ampqServer = "ampq://localhost:5672";
        connection = await amqp.connect(ampqServer)
        channel = await connection.createChannel()
        await channel.assertExchange("session" , data => {
            console.log(`recived data at 5002 port ${Buffer.from(data.content)}`);
            channel.ack(data)
            
        })
    } catch (error) {
        console.error(error);
        
    }
}

app.listen(PORT, ()=> {
    console.log(`Server at ${PORT}`);
})