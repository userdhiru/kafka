const  kafkaNode  = require('kafka-node');
const Producer = kafkaNode.Producer;
const Client = kafkaNode.KafkaClient;

async function justWait() {
  return new Promise((resolve, reject) => setTimeout(resolve, 100));
}

module.exports.sayHelloAsync = async (event) => {

  console.log("printing event",event);

  const topic ="knative-demo-topic";
  const message ="hello";

   //  kafka code
  const kafkaHost = 'my-cluster-kafka-bootstrap.kafka:9092';

  // The client connects to a Kafka broker
  const client = new Client({ kafkaHost });

  // The producer handles publishing messages over a topic
  const producer = new Producer(client);
// First wait for the producer to be initialized
    producer.on(
        'ready',() => {
                    console.log(`Sending message tofffff ${topic}: ${message}`);
            // Update metadata for the topic we'd like to publish to
            client.refreshMetadata([topic], (err) => {
                              if (err) {
                                 throw err;
                               }

                    console.log(`Sending message to ${topic}: ${message}`);
                    producer.send(
                        [{ topic, messages: [message] }],(err, result) => {
                            console.log(err || result);
                            process.exit();
                        }
                    );
                }
            );
        }
    );

   // Handle errors
    producer.on(
        'error',
        (err) => {
            console.log('error', err);
        }
    );

  await justWait();
  };
