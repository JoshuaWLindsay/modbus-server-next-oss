import logger from '../logger';

interface DeviceContext {
  deviceId: string;
  state: string;
}

const deviceContexts: Record<string, DeviceContext> = {};

export function updateContext(deviceId: string, newState: string) {
  if (!deviceContexts[deviceId]) {
    deviceContexts[deviceId] = { deviceId, state: newState };
  } else {
    deviceContexts[deviceId].state = newState;
  }
  logger.info(`Context updated for device ${deviceId}: ${newState}`);
}

export function getContext(deviceId: string): DeviceContext | undefined {
  return deviceContexts[deviceId];
}
