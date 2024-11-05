 
 const express = require("express")
 const app = express()
 const PORT = 5001;
 const ampq = require("amqplib")
 let channel , connection;

 app.use(express.json())

 ampq.connect();

 async function connect() {

    try {
        const ampqServer = "ampq://localhost:5672";
        connection = await ampq.connect(ampqServer)
        channel = await connection.createChannel();
        await channel.assertQueue("session");

    } catch (error) {
        console.error(error);      
    }
    
 }

 const createSession = async user => {

    await channel.sendToQueue("session",Buffer.from(JSON.stringify(user)));
    await channel.close();
    await connection.close();
 }

 app.post ('/login',(req,res) => {
    const {user} =req.body;
    createSession(user)
    res.send(user)
 })

 app.listen(PORT,()=> {
    console.log(console.log(`server is running on ${PORT} `));
       
 })