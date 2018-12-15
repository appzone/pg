// import { Pool } from 'pg'
// import config from '../env'


// //let dbPool
// // Creates a Connection Pool to Postgres. Note that this is done outside the
// // main function in order to ensure this pool only created once.
// const pool = new Pool({
//   host: config.pgHost,
//   port: config.pgPort,
//   database: config.pgDatabase,
//   user: config.pgUsername,
//   password: config.pgPassword,
//   idleTimeoutMillis: config.pgIdleTimeout, // close idle clients after x second
// })

// const connectDb = () => {
//   console.log("connecting dbb")
//   return pool.connect()
// }

// module.exports = connectDb

import Rx from 'rxjs/Rx'
import { Pool } from 'pg'
import config from '../env'

// Creates a Connection Pool to Postgres. Note that this is done outside the
// main function in order to ensure this pool only created once.
const pool = new Pool({
  host: config.pgHost,
  port: config.pgPort,
  database: config.pgDatabase,
  user: config.pgUsername,
  password: config.pgPassword,
  idleTimeoutMillis: config.pgIdleTimeout, // close idle clients after x second
})

const connectDb = () => {
  // pool.connect()
  return pool
}

const getPool = () => {
  return pool
}

module.exports = { 
  connectDb,
  getPool
}