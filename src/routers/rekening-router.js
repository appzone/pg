import Express from 'express'
import uuid from 'uuid/v4'
import amqp from 'amqplib/callback_api'
import {
    historyRekening, validateRekening, validateDeposit, transaction, validateBlokirRekening,
    validateAktivasiRekening, aktivasiRekening, validateUpdateRekening, updateDataRekening,
} from '../model/rekening'
import Response from '../response'
import mongoConn from '../model/mongoConn'

const router = Express.Router()
mongoConn.mongoConn()

router.post('/history', (req, res) => {
    const reqId = uuid()

    const params = req.body
    const code = validateRekening(params)
    if (code !== 200) {
        const data = Response.setJson('Rekening', code, reqId)
        Response.setResponse(res, null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 612) })
    } else {
        historyRekening(params)
            .subscribe(
                (data) => {
                    Response.setResponse(res, null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 613) })
                },
                (err) => {
                    Response.setResponse(res, null, Response.setJson('Rekening', 301, reqId))
                    mongoConn.Log.createLog({ logData: err, reqId, module: Response.setModule('Rekening', 614) })
                },
            )
    }
})

router.post(['/deposit', '/transfer', '/withdraw'], (req, res) => {
    const reqId = uuid()

    const params = req.body
    const newParams = { ...params }

    const url = req.url.split('/')[1]
    newParams.type = url

    const code = validateDeposit(newParams)
    if (code !== 200) {
        const data = Response.setJson('Rekening', code, reqId)
        Response.setResponse(res, null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 609) })
    } else {
        transaction(newParams)
            .subscribe(
                (data) => {
                    const msg = JSON.stringify(data.params)

                    amqp.connect('amqp://localhost', (err, conn) => {
                        conn.createChannel((errCh, ch) => {
                            const q = 'transaction'

                            ch.assertQueue(q, { durable: false })
                            ch.sendToQueue(q, Buffer.from(msg))
                            console.log(' [x] Sent %s', msg)
                        })
                        setTimeout(() => { conn.close() }, 500)
                    })
                    const output = { ...data }
                    delete output.params


                    Response.setResponse(res, null, output)
                    mongoConn.Log.createLog({ logData: JSON.stringify(output), reqId, module: Response.setModule('Rekening', 610) })
                },
                (err) => {
                    Response.setResponse(res, null, Response.setJson('Rekening', 301, reqId))
                    mongoConn.Log.createLog({ logData: err, reqId, module: Response.setModule('Rekening', 611) })
                },
            )
    }
})

router.post('/blokir', (req, res) => {
    const reqId = uuid()

    const params = req.body
    const code = validateBlokirRekening(params)
    if (code !== 200) {
        const data = Response.setJson('Rekening', code, reqId)
        Response.setResponse(res, null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 606) })
    } else {
        const newParams = { ...params }
        newParams.type = 'blokir'
        updateDataRekening(newParams)
            .subscribe(
                (data) => {
                    Response.setResponse(res, null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 607) })
                },
                (err) => {
                    Response.setResponse(res, null, Response.setJson('Rekening', 301, reqId))
                    mongoConn.Log.createLog({ logData: err, reqId, module: Response.setModule('Rekening', 608) })
                },
            )
    }
})

router.post('/update', (req, res) => {
    const reqId = uuid()

    const params = req.body
    const code = validateUpdateRekening(params)
    if (code !== 200) {
        const data = Response.setJson('Rekening', code, reqId)
        Response.setResponse(res, null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 603) })
    } else {
        const newParams = { ...params }
        newParams.type = 'update'
        updateDataRekening(newParams)
            .subscribe(
                (data) => {
                    Response.setResponse(res, null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 604) })
                },
                (err) => {
                    Response.setResponse(res, null, Response.setJson('Rekening', 301, reqId))
                    mongoConn.Log.createLog({ logData: err, reqId, module: Response.setModule('Rekening', 605) })
                },
            )
    }
})

router.post('/aktivasi', (req, res) => {
    const reqId = uuid()

    const params = req.body
    const code = validateAktivasiRekening(params)
    if (code !== 200) {
        const data = Response.setJson('Rekening', code, reqId)
        Response.setResponse(res, null, data)
        mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 600) })
    } else {
        aktivasiRekening(params)
            .subscribe(
                (data) => {
                    Response.setResponse(res, null, data)
                    mongoConn.Log.createLog({ logData: JSON.stringify(data), reqId, module: Response.setModule('Rekening', 601) })
                },
                (err) => {
                    Response.setResponse(res, null, Response.setJson('Rekening', 301, reqId))
                    mongoConn.Log.createLog({ logData: err, reqId, module: Response.setModule('Rekening', 602) })
                },
            )
    }
})

export default router
