import awsIot from 'aws-iot-device-sdk';
import logger from '../logger';
import dotenv from 'dotenv';

dotenv.config();

const device = awsIot.device({
  keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
  caPath: './certs/AmazonRootCA1.pem',
  clientId: 'modbusServer',
  host: process.env.AWS_IOT_HOST,
});

device.on('connect', () => {
  logger.info('Connected to AWS IoT');
  // Subscribe or publish as needed
  device.subscribe('modbusServer/topic');
});

device.on('message', (topic, payload) => {
  logger.info(`Received AWS IoT message on ${topic}`);
  // Handle cloud commands
  try {
    const data = JSON.parse(payload.toString());
    // Implement command handling logic
  } catch (error) {
    logger.error('Error processing AWS IoT message:', error);
  }
});

device.on('error', (error) => {
  logger.error('AWS IoT Device Error:', error);
});
