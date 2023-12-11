module.exports = (io) => {
  const { Kafka } = require("kafkajs");

  const kafka = new Kafka({
    clientId: "consumer-1",
    brokers: ["pkc-312o0.ap-southeast-1.aws.confluent.cloud:9092"],
    ssl: true,
    sasl: {
      mechanism: "plain",
      username: "VJWPEBI4B4MKYKVB",
      password:
        "+MBjyWPtXKlEvwvlQTZY690SjXnHPhv5zOkP5UZqZ8U4ioQ+U7K03vpN32USSOJv",
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
