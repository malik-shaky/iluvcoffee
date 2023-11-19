export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_Host,
    port: parseInt(process.env.DB_Port, 10) || 5432,
  },
});
