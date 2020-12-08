const { Kafka } = require('kafkajs');
const config = require('./kafkaConnection');

async function justWait() {
  return new Promise((resolve, reject) => setTimeout(resolve, 100));
}

module.exports.sayHelloAsync = async (event) => {

  console.log("printing event",event);

  const message ="hello";

  // 1.Instantiating kafka
  const kafka = new Kafka(config);

  // 2.Creating Kafka Producer
  const producer = kafka.producer();

  const runProducer = async () => {const message = {
    nTransOrderID: 1000,
    sTransOrderCode: "TO-101212"
   }

// 3.Connecting producer to kafka broker.
await producer.connect();
await producer.send({
topic: 'knative-demo-topic',
messages:
[{ value: JSON.stringify(message) }],
})}
  await justWait();
  };
