import Express from 'express'
import uuid from 'uuid/v4'
import { registerUser, validateUser, loginUser } from '../model/user'
import Response from '../response'
import mongoConn from '../model/mongoConn'

const router = Express.Router()
mongoConn.mongoConn()

router.post('/login', (req, res) => {
    const reqId = uuid()

    const params = req.body
    const code = validateUser(params)
    if (code !== 200) {
        const data = Response.setJson('User', code, reqId)
        Response.setResponse(res, null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('User', 600) })
    } else {
        loginUser(params)
            .subscribe(
                (data) => {
                    Response.setResponse(res, null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('User', 601) })
                },
                (err) => {
                    Response.setResponse(res, null, Response.setJson('User', 301, reqId))
                    mongoConn.Log.createLog({ logData: err, reqId, module: Response.setModule('User', 602) })
                },
            )
    }
})

router.post('/register', (req, res) => {
    const reqId = uuid()

    const params = req.body
    const code = validateUser(params)
    if (code !== 200) {
        const data = Response.setJson('User', code, reqId)
        Response.setResponse(res, null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('User', 603) })
    } else {
        registerUser(params)
            .subscribe(
                (data) => {
                    Response.setResponse(res, null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('User', 604) })
                },
                (err) => {
                    Response.setResponse(res, null, Response.setJson('User', 301, reqId))
                    mongoConn.Log.createLog({ logData: err, reqId, module: Response.setModule('User', 605) })
                },
            )
    }
})

export default router
