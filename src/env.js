const config = {
    appVersion: process.env.APP_VERSION || '0.2.9-0',
    appPort: process.env.APP_PORT || 3000,
    appHost: process.env.APP_HOST || '127.0.0.1',
    pgHost: process.env.PG_HOST || 'localhost',
    pgPort: process.env.PG_PORT || 5432,
    pgIdleTimeout: process.env.PG_IDLE_TIMEOUT || 10000,
    pgDatabase: process.env.PG_DATABASE || 'pg',
    pgUsername: process.env.PG_USERNAME || 'postgres',
    pgPassword: process.env.PG_PASSWORD || 'Vogel8-Salve7',
    mongoConnString: process.env.MONGO_CONN_STRING || 'mongodb://localhost:27017/pg',
  }


  module.exports = config