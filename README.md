# rabbitmq_practice
This was the thrid homework in Cloud Computing course. <br>
1. When a request comes into ```/listen``` with ```{keys: []}```, the program makes an exclusive queue and bind the keys[] to the queue. <br>
2. Waits for incomming message... <br>
3. When a request comes into ```/speak``` with {key:"example", msg:"Hello"}, then the program fires this message with the routing key. <br>
4-1. If the message arrives successfully, then the message is printed out in console and send response back to client. <br>
4-2. If not, the message will not be acknowledged and be resent by client after timeout. <br>

- Implemented RabbitMQ in Javascript
- Used NodeJS and Express to handle REST API 
- This program was ran on a cloud instance
