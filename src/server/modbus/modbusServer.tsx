import net from 'net';
import Modbus from 'jsmodbus';
import logger from '../logger';

const serverSocket = new net.Server();
const holdingRegisters = Buffer.alloc(200 * 2); // 200 holding registers
const inputRegisters = Buffer.alloc(200 * 2); // 200 input registers

export const modbusServer = new Modbus.server.TCP(serverSocket, {
  holding: holdingRegisters,
  input: inputRegisters,
  // Add coils and discrete inputs if needed
});

serverSocket.listen(1502, () => {
  logger.info('Modbus server listening on port 1502');
});

// Handle Modbus server events
modbusServer.on('connection', (client) => {
  logger.info('New Modbus client connection');
});
