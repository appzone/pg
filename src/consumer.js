import amqp from 'amqplib/callback_api'
import processTransaction from './model/rekening'

amqp.connect('amqp://my-rabbit', (err, conn) => {
    console.log("ERR " , err)
    conn.createChannel((errCh, ch) => {
        const q = 'transaction'
        ch.assertQueue(q, { durable: false })
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q)
        ch.consume(q, (msg) => {
            const data = msg.content.toString()
            console.log(' [x] Received %s', data)
            const dataObj = JSON.parse(data)
            if (dataObj.type === 'transfer') {
                dataObj.type = 'deposit'
                processTransaction(dataObj)
                    .map(() => {
                        dataObj.type = 'withdraw'
                    })
                    .switchMap(() => processTransaction(dataObj))
                    .subscribe()
            } else {
                processTransaction(dataObj)
                    .subscribe()
            }
        }, { noAck: true })
    })
})
