import Rx from 'rxjs/Rx'
import jwt from 'jsonwebtoken'
import getPool from './dbConn'
import Response from '../response'
import env from '../env'

const p = getPool()


const validateUser = (params) => {
    let statusCode = 200
    if (!params.username) {
        statusCode = 400
    } else if (!params.password) {
        statusCode = 401
    }
    return statusCode
}

const updateUser = (params) => {
    const query = {}
    if (params.type === 'login') {
        query.text = 'UPDATE "user" SET last_login = $1 WHERE id = $2'
        query.values = ['now()', `${params.userId}`]
    }
    return Rx.Observable
        .fromPromise(p.query(query))
}

const loginUser = (params) => {
    const query = {
        text: 'SELECT id FROM "user" WHERE username = $1 and password = $2 LIMIT 1',
        values: [
            `${params.username}`,
            `${params.password}`,
        ],
    }
    const newParams = { ...params }
    newParams.type = 'login'

    return Rx.Observable
        .fromPromise(p.query(query))
        .map((res) => {
            newParams.userId = res.rows[0].id
            return newParams
        })
        .switchMap(res => updateUser(res))
        .map(() => {
            const statusCode = '200'
            const final = Response.setJson('User', statusCode)
            final.data = {
                token: jwt.sign({ username: params.username, id: params.userId }, env.jwtKey),
            }
            return final
        })
}

const registerUser = (params) => {
    const query = {
        text: 'INSERT INTO "user" ("username", "password","created_at") '
                   + 'VALUES($1, $2,$3) RETURNING id',
        values: [
            `${params.username}`,
            `${params.password}`,
            'now()',
        ],
    }

    return Rx.Observable
        .fromPromise(p.query(query))
        .map((res) => {
            const userId = res.rows[0].id
            const query2 = {
                text: 'INSERT INTO "account" ("account_number", "user_id") '
                        + 'VALUES($1, $2) ',
                values: [
                    Math.floor(Math.random() * 1000000) + 1000000,
                    userId,
                ],
            }
            Rx.Observable.fromPromise(p.query(query2))
            const statusCode = '200'
            const final = Response.setJson('User', statusCode)
            return final
        })
}


export {
    loginUser,
    registerUser,
    validateUser,
}
