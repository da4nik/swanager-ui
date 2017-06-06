export default {
  apiURL: process.env.myenv.SWANAGER_API_URL || 'http://localhost:4945/api/v1',
  wsURL: process.env.myenv.SWANAGER_WS_URL || 'ws://localhost:4945/ws',
};
