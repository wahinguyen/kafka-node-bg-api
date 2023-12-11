module.exports = (io) => {
  const { Kafka } = require("kafkajs");

  const kafka = new Kafka({
    clientId: "consumer-1",
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
    ssl: true,
    sasl: {
      mechanism: "plain",
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  });
  const consumer = kafka.consumer({ groupId: "group-1" });

  // Kafka message handling
  const runConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({
      topic: "apache.kafka.external.client",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const obj = JSON.parse(message.value);
        io.emit("behavior", obj);
        console.log(
          "****************** External arriving message ******************"
        );
        console.log(obj);
      },
    });
  };

  runConsumer().catch((error) =>
    console.error("Error running external Kafka service:", error)
  );
};
