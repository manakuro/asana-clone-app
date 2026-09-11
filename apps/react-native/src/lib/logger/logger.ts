import { consoleTransport, logger } from 'react-native-logs';

export const log = logger.createLogger({
  severity: __DEV__ ? 'debug' : 'error',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      debug: 'greenBright',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: false,
});
