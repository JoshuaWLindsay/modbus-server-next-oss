export const modbusConfig = {
  port: process.env.MODBUS_PORT || 1502,
  holdingRegistersCount: 200,
  inputRegistersCount: 200,
};
