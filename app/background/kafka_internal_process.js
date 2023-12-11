module.exports = () => {
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
  const consumer = kafka.consumer({ groupId: "group-2" });
  const producer = kafka.producer();

  // Kafka message handling
  const runConsumer = async () => {
    await consumer.connect();
    await producer.connect();
    await consumer.subscribe({
      topic: "apache.kafka.mysql.kafka_db.colors_behavior",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const obj = JSON.parse(message.value);
        const { red, blue, yellow } = obj;
        const total = red + blue + yellow;

        const result = {
          total: total,
          redPercent: Math.ceil((red / total) * 100),
          bluePercent: Math.ceil((blue / total) * 100),
          yellowPercent: Math.ceil((yellow / total) * 100),
        };
        await producer.send({
          topic: "apache.kafka.external.client",
          messages: [{ value: JSON.stringify(result) }],
        });

        console.log(
          "****************** Interval arriving message ******************"
        );
        console.log(result);
      },
    });
  };

  runConsumer().catch((error) =>
    console.error("Error internal Kafka service:", error)
  );
};
