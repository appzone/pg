import Express from 'express'
import { insertUser } from '../model/user'
import Response from '../response'
import mongoConn from '../model/mongoConn'
import uuid from 'uuid/v4';

const router = Express.Router()
mongoConn.mongoConn()

router.get('/test', (req, res)=> {

        let params = {
                username: "ddasdasdd",
                password: null
        }
        console.log("before insert");
        let reqId = uuid()
        insertUser(params)
                .subscribe(
                        data =>  {
                            Response.setResponse(res,data)
                            mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId })
                        },
                        err => {
                            Response.setResponse(res,null, Response.setJson("RegisterUser",301,reqId))
                            mongoConn.Log.createLog({ logData:  err , reqId })
                        },
                        () => console.log("complete")
                )         

});

module.exports = router
