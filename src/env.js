const config = {
    appVersion: process.env.APP_VERSION || '0.2.9-0',
    appPort: process.env.APP_PORT || 3000,
    appHost: process.env.APP_HOST || '127.0.0.1',
    pgHost: process.env.PG_HOST || 'db_db',
    pgPort: process.env.PG_PORT || 5432,
    pgIdleTimeout: process.env.PG_IDLE_TIMEOUT || 10000,
    pgDatabase: process.env.PG_DATABASE || 'pg',
    pgUsername: process.env.PG_USERNAME || 'postgres',
    pgPassword: process.env.PG_PASSWORD || 'Vogel8-Salve7',
    mongoConnString: process.env.MONGO_CONN_STRING || 'mongodb://db_mongo:27017/pg',
    jwtKey: 'pl4yG4m3',
}


module.exports = config
