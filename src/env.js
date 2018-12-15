const config = {
    appVersion: process.env.APP_VERSION || '0.2.9-0',
    appPort: process.env.APP_PORT || 3000,
    appHost: process.env.APP_HOST || '127.0.0.1',
    pgHost: process.env.PG_HOST || '192.168.65.3',
    pgPort: process.env.PG_PORT || 5432,
    pgIdleTimeout: process.env.PG_IDLE_TIMEOUT || 1000,
    pgDatabase: process.env.PG_DATABASE || 'pg',
    pgUsername: process.env.PG_USERNAME || 'postgres',
    pgPassword: process.env.PG_PASSWORD || 'Vogel8-Salve7',
  }


  module.exports = config