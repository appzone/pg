import Rx from 'rxjs/Rx'
import { Decimal } from 'decimal.js'
import { getPool } from './dbConn'
import Response from '../response'

Decimal.set = {
    rounding: 9,
    precision: 9,
}

const p = getPool()

const validateRekening = (params) => {
    let statusCode = 200
    if (!params.accountNumber) statusCode = 401
    return statusCode
}

const validateDeposit = (params) => {
    let statusCode = 200
    if (params.type === "deposit") {
        if (!params.destinationAccount) {
            statusCode = 404
        } else if (!params.balance) {
            statusCode = 405
        }
    } else if (params.type === "transfer"){
        if (!params.destinationAccount) {
            statusCode = 404
        } else if (!params.sourceAccount) {
            statusCode = 406
        } else if(!params.balance) {
            statusCode = 405
        }
    } else if (params.type === "withdraw") {
        if (!params.sourceAccount){
            statusCode = 406
        } else if(!params.balance) {
            statusCode = 405
        }        
    }
    return statusCode
}

const updateBalance = (params) => {

    const query = {
        text: 'UPDATE account SET account_balance = $1 WHERE account_number = $2',
        values: [`${params.finalBalance}`, `${params.accountNumber}`]
    }

    return Rx.Observable
        .fromPromise(p.query(query))
}

const validateBlokirRekening = (params) => {
    let statusCode = 200
    if (!params.isBlocked){
        statusCode = 403
    } else if (!params.accountNumber) {
        statusCode = 401
    }
    return statusCode
}

const validateUpdateRekening = (params) => {
    let statusCode = 200
    if (!params.newAccountNumber){
        statusCode = 402
    } else if (!params.accountNumber) {
        statusCode = 401
    }
    return statusCode
}

const validateAktivasiRekening = (params) => {
    let statusCode= 200
    if (!params.code)
    {
        statusCode = 400
    } else if (!params.accountNumber) {
        statusCode = 401
    }
    return statusCode
}

const updateRekening = (params) => {
    let query = {}
    if(params.type === "update")
    {
        query.text = 'UPDATE "account" SET account_number = $1 WHERE user_id = $2 and account_number = $3'
        query.values = [ `${params.newAccountNumber}`, `${params.userId}`, `${params.accountNumber}` ]        
    }
    else if (params.type === "aktivasi")
    {
        query.text = 'UPDATE "account" SET activated = true WHERE id = $1'
        query.values = [ `${params.id}` ]
    }
    else if(params.type === "blokir") 
    {
        query.text = 'UPDATE "account" SET is_blocked = $1,last_blocked = $2 WHERE user_id = $3 AND account_number = $4'
        query.values = [ `${params.isBlocked}`, `now()`, `${params.userId}`, `${params.accountNumber}` ]
    } 
    return Rx.Observable
        .fromPromise(p.query(query))

}

const updateDataRekening = (params) => {
    return updateRekening(params)
        .map(res => {
            let statusCode = "200"
            if(res.rowCount < 1)
                statusCode = 500

            let final = Response.setJson("Rekening", statusCode)
            return final
        })
}

const historyRekening = (params) => {
    const query = {
        text: "SELECT destination_account, transaction_type, created_at, balance FROM transaction_log " +
                "WHERE source_account = $1 or destination_account = $1 ORDER BY created_at desc",
        values: [ `${params.accountNumber}` ]
    }
    return Rx.Observable
        .fromPromise(p.query(query))
        .map(res => {
            let statusCode = "200"
            if(res.rowCount < 1)
                statusCode = 500

            let final = Response.setJson("Rekening", statusCode)
            final.data = res.rows
            return final
        })
}

const aktivasiRekening = (params) => {

    const query = {
        text: 'SELECT id FROM "account" WHERE user_id = $1 and account_number = $2 and activation_code = $3 LIMIT 1',
        values: [
            `${params.userId}`,
            `${params.accountNumber}`,
            `${params.code}`
        ]
    }

    return Rx.Observable
        .fromPromise(p.query(query))
        .map(res => {
            params.type = 'aktivasi'
            params.id = res.rows[0].id
            params.rowCount = res.rowCount
        })
        .switchMap(res => updateRekening(params))
        .map(res => {
            let statusCode = "200"
            if(params.rowCount < 1)
                statusCode = 500

            let final = Response.setJson("Rekening", statusCode)
            return final
        })

}

const processTransaction = (params) => {
    let query = {}
    if(params.type == "deposit")
    {
        query.text = "SELECT account_balance FROM account WHERE account_number = $1"
        query.values = [ `${params.destinationAccount}` ]
    }
    else if (params.type == "withdraw")
    {
        query.text = "SELECT account_balance FROM account WHERE account_number = $1"
        query.values = [ `${params.sourceAccount}` ]

    }
    
    return Rx.Observable
        .fromPromise(p.query(query))
        .map(res => {
            let balance = new Decimal(res.rows[0].account_balance)
            let opBalance = new Decimal(params.balance)
            let finalBalance,accountNumber
            if(params.type == "deposit")
            {                
                finalBalance = balance.plus(opBalance)
                accountNumber = params.destinationAccount
            }
            else if (params.type == "withdraw"){
                finalBalance = balance.minus(opBalance)
                accountNumber = params.sourceAccount
            }
            params.finalBalance = finalBalance.toFixed(8)
            params.accountNumber = accountNumber
        })
        .switchMap(res => updateBalance(params))
        .switchMap(res => updateTransaction(params))


}

const updateTransaction = (params) => {
    const query = {
        text: 'UPDATE transaction_log SET status = $1 WHERE id = $2',
        values: [ 'DONE',`${params.id}`]
    }
    return Rx.Observable
        .fromPromise(p.query(query))
}

const transaction = (params) => {
    let query
    if(params.type == "deposit")
    {
        query = {
            text: 'INSERT INTO transaction_log("destination_account","transaction_type","created_at","balance") VALUES($1,$2,$3,$4) RETURNING id',
            values: [
                `${params.destinationAccount}`,
                'DEPOSIT',
                `now()`,
                `${params.balance}`
            ]
        }
    }
    else if (params.type == "transfer"){
        query = {
            text: 'INSERT INTO transaction_log("source_account","destination_account","transaction_type","created_at","balance") VALUES($1,$2,$3,$4,$5) RETURNING id',
            values: [
                `${params.sourceAccount}`,
                `${params.destinationAccount}`,
                'TRANSFER',
                `now()`,
                `${params.balance}`
            ]
        }
    }
    else if (params.type == "withdraw"){
        query = {
            text: 'INSERT INTO transaction_log("source_account","transaction_type","created_at","balance") VALUES($1,$2,$3,$4) RETURNING id',
            values: [
                `${params.sourceAccount}`,
                'WITHDRAW',
                `now()`,
                `${params.balance}`
            ]
        }
    }

    return Rx.Observable
        .fromPromise(p.query(query))
        .map(res => {
            let statusCode = "200"
            if(params.rowCount < 1)
                statusCode = 500

            let final = Response.setJson("Rekening", statusCode)
            params.id = res.rows[0].id
            final.params = params
            return final
        })

}

module.exports = {
    validateAktivasiRekening,
    validateBlokirRekening,    
    validateDeposit,    
    validateUpdateRekening,    
    validateRekening,    
    aktivasiRekening,
    updateDataRekening,
    transaction,
    processTransaction,
    historyRekening
}
