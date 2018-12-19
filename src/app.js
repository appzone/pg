// const PgCommon = require('./common');
// const apiRouter = require('./routers/api-router');

import PgCommon from './common'
import userRouter from './routers/user-router'
import rekeningRouter from './routers/rekening-router'
import { isUserAuthenticated } from './routers/protected-router'
import config from './env'

PgCommon.init()

const PgApp = new PgCommon.lib.PgApp(config.appPort)

PgApp.app.get('/monitor', (req, res) => {
    res.send('Ok')
})

PgApp.app.use('/api/user', userRouter)
PgApp.app.use('/api/rekening', isUserAuthenticated, rekeningRouter)

PgApp.listen()
