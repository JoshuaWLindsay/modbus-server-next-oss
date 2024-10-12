export const mqttConfig = {
  brokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com',
  topics: {
    subscribe: 'your/topic/#',
    publish: 'your/publish/topic',
  },
};
