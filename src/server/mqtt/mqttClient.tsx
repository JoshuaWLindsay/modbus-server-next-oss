import mqtt from 'mqtt';
import { modbusServer } from '../modbus/modbusServer';
import logger from '../logger';
import { updateContext } from '../context/contextManager';
import dotenv from 'dotenv';

dotenv.config();

const MQTT_BROKER_URL =
  process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com';

const mqttClient = mqtt.connect(MQTT_BROKER_URL, {
  // Add SSL options if needed
});

mqttClient.on('connect', () => {
  logger.info('Connected to MQTT broker');
  mqttClient.subscribe('your/topic/#', (err) => {
    if (err) {
      logger.error('MQTT subscription error:', err);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  logger.info(`Received MQTT message on ${topic}`);
  try {
    const data = JSON.parse(message.toString());
    // Example: Write value to input register 0
    if (data.value !== undefined) {
      modbusServer.input.writeUInt16BE(data.value, 0);
    }
    // Update context if needed
    if (data.deviceId && data.state) {
      updateContext(data.deviceId, data.state);
    }
  } catch (error) {
    logger.error('Error processing MQTT message:', error);
  }
});
