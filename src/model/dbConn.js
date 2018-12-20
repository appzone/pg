import { Pool } from 'pg'
import config from '../env'

const pool = new Pool({
    host: config.pgHost,
    port: config.pgPort,
    database: config.pgDatabase,
    user: config.pgUsername,
    password: config.pgPassword,
    idleTimeoutMillis: config.pgIdleTimeout,
})


const getPool = () => {
    return pool
}
export default getPool
