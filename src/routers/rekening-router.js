import Express from 'express'
import { historyRekening,validateRekening,validateDeposit, transaction, validateBlokirRekening, validateAktivasiRekening, aktivasiRekening, validateUpdateRekening, updateDataRekening } from '../model/rekening'
import Response from '../response'
import mongoConn from '../model/mongoConn'
import uuid from 'uuid/v4';

const router = Express.Router()
mongoConn.mongoConn()

router.post('/history', (req,res) => {
    let reqId = uuid()

    let params = req.body
    let code = validateRekening(params)
    if(code != 200)
    {
        let data = Response.setJson("Rekening",code,reqId)
        Response.setResponse(res,null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",612) })
    }
    else {
        historyRekening(params)
            .subscribe(
                data =>  {
                    Response.setResponse(res,null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",613) })
                },
                err => {
                    console.log("ERR"  ,err)
                    Response.setResponse(res,null, Response.setJson("Rekening",301,reqId))
                    mongoConn.Log.createLog({ logData:  err , reqId, module: Response.setModule("Rekening",614) })
                }
            )         
    }    
})

router.post(['/deposit','/transfer','/withdraw'], (req, res) => {
    let reqId = uuid()

    let params = req.body
    params.type = req.url.split('/')[1]
    let code = validateDeposit(params)
    if(code != 200)
    {
        let data = Response.setJson("Rekening",code,reqId)
        Response.setResponse(res,null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",609) })
    }
    else {
        transaction(params)
            .subscribe(
                data =>  {
                    /* Init RabbitMQ */
                    
                    var amqp = require('amqplib/callback_api');
                    var msg = JSON.stringify(data.params)

                    amqp.connect('amqp://localhost', function(err, conn) {
                        conn.createChannel(function(err, ch) {
                            var q = 'transaction';

                            ch.assertQueue(q, {durable: false});
                            ch.sendToQueue(q, Buffer.from(msg));
                            console.log(" [x] Sent %s", msg);
                        });
                        setTimeout(function() { conn.close(); }, 500);
                    });

                    delete data.params


                    Response.setResponse(res,null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",610) })
                },
                err => {
                    Response.setResponse(res,null, Response.setJson("Rekening",301,reqId))
                    mongoConn.Log.createLog({ logData:  err , reqId, module: Response.setModule("Rekening",611) })
                }
            )         
    }
})

router.post('/blokir', (req,res) => {
    let reqId = uuid()

    let params = req.body
    let code = validateBlokirRekening(params)
    if(code != 200)
    {
        let data = Response.setJson("Rekening",code,reqId)
        Response.setResponse(res,null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",606) })
    }
    else {
        params.type = "blokir"
        updateDataRekening(params)
            .subscribe(
                data =>  {
                    Response.setResponse(res,null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",607) })
                },
                err => {
                    Response.setResponse(res,null, Response.setJson("Rekening",301,reqId))
                    mongoConn.Log.createLog({ logData:  err , reqId, module: Response.setModule("Rekening",608) })
                }
            )         
    }

})

router.post('/update', (req,res) => {
    let reqId = uuid()

    let params = req.body
    let code = validateUpdateRekening(params)
    if(code != 200)
    {
        let data = Response.setJson("Rekening",code,reqId)
        Response.setResponse(res,null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",603) })
    }
    else {
        params.type = "update"
        updateDataRekening(params)
            .subscribe(
                data =>  {
                    Response.setResponse(res,null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",604) })
                },
                err => {
                    Response.setResponse(res,null, Response.setJson("Rekening",301,reqId))
                    mongoConn.Log.createLog({ logData:  err , reqId, module: Response.setModule("Rekening",605) })
                }
            )         
    }

})

router.post('/aktivasi', (req,res) => {
    let reqId = uuid()

    let params = req.body
    let code = validateAktivasiRekening(params)
    if(code != 200)
    {
        let data = Response.setJson("Rekening",code,reqId)
        Response.setResponse(res,null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",600) })
    }
    else {
        aktivasiRekening(params)
            .subscribe(
                data =>  {
                    Response.setResponse(res,null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data) , reqId, module: Response.setModule("Rekening",601) })
                },
                err => {
                    Response.setResponse(res,null, Response.setJson("Rekening",301,reqId))
                    mongoConn.Log.createLog({ logData:  err , reqId, module: Response.setModule("Rekening",602) })
                }
            )         
    }

})

module.exports = router
