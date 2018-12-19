import Express from 'express'
import { registerUser, validateUser, loginUser } from '../model/user'
import Response from '../response'
import mongoConn from '../model/mongoConn'
import uuid from 'uuid/v4';

const router = Express.Router()
mongoConn.mongoConn()

router.post('/login', (req, res)=> {
    let reqId = uuid()

    let params = req.body
    let code = validateUser(params)
    if(code != 200)
    {
        let data = Response.setJson("User",code,reqId)
        Response.setResponse(res,null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("User",600) })
    }
    else {
        loginUser(params)
            .subscribe(
                data =>  {
                    Response.setResponse(res,null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("User",601)})
                },
                err => {
                    Response.setResponse(res,null, Response.setJson("User",301,reqId))
                    mongoConn.Log.createLog({ logData:  err , reqId, module: Response.setModule("User",602) })
                }
            )         
    }

})

router.post('/register', (req, res)=> {

        let reqId = uuid()

        let params = req.body
        let code = validateUser(params)
        if(code != 200)
        {
            let data = Response.setJson("User",code,reqId)
            Response.setResponse(res,null, data)
            mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("User",603)})
        }
        else {
            registerUser(params)
                    .subscribe(
                            data =>  {
                                Response.setResponse(res,null, data)
                                mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("User",604) })
                            },
                            err => {
                                Response.setResponse(res,null, Response.setJson("User",301,reqId))
                                mongoConn.Log.createLog({ logData:  err , reqId, module: Response.setModule("User",605) })
                            }
                    )         
        }

});

module.exports = router
