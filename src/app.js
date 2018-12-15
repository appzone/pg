// const PgCommon = require('./common');
// const apiRouter = require('./routers/api-router');

import PgCommon from './common'
import apiRouter from './routers/api-router'
import config from './env'
PgCommon.init()

const PgApp = new PgCommon.lib.PgApp(config.appPort)

PgApp.app.get('/monitor', (req, res) => {
    res.send('Ok')
})

PgApp.app.use('/api', apiRouter)

PgApp.listen()
