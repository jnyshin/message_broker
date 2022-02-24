var amqp = require("amqplib/callback_api");
const speak = (key, msg, res) => {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      //To see what exchanges are there, run: sudo rabbitmqctl list_exchanges
      var exchange = "hw3";
      console.log("Got into speak");
      channel.assertExchange(exchange, "direct", { durable: false });
      //channel.publish(exchange name, exchange type, message)
      //var args = process.argv.slice(2);
      //var severity = (args.length > 0) ? args[0] : 'info';    //routing key
      channel.publish(exchange, key, Buffer.from(msg));
      console.log(" [x] Sent %s", key, msg);
    });
  });
  res.send({ status: "OK" });
};
exports.speak = speak;
