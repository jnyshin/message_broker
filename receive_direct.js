var amqp = require("amqplib/callback_api");
var result = "";
const promise1 = new Promise(function (resolve, reject) {
  if (result != "") {
    resolve();
  } else {
    setTimeout(() => resolve("waited", 1000));
  }
});

const listen = (keys, res) => {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      console.log("keys", keys);
      if (error1) {
        throw error1;
      }
      var exchange = "hw3";
      channel.assertExchange(exchange, "direct", {
        durable: false,
      });

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (error2, q) {
          if (error2) {
            throw error2;
          }
          keys.forEach(function (severity) {
            channel.bindQueue(q.queue, exchange, severity);
          });
        }
      );
      console.log(" [*] Waiting RPC requests");
      channel.prefetch(1);
      channel.consume(
        "",
        function (msg) {
          //console.log(msg)
          console.log(
            " [x] %s: '%s'",
            msg.fields.routingKey,
            msg.content.toString()
          );
          result = msg.content.toString();
          console.log(promise1);
          promise1
            .then(() => {
              res.send({ msg: result });
            })
            .catch((error) => {
              console.log(error);
            });
        },
        {
          noAck: true,
        }
      );
    });
  });
};

exports.listen = listen;
