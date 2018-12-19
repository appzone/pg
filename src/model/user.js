import Rx from 'rxjs/Rx'
import  { connectDb, getPool } from './dbConn'
import Response from '../response'
import jwt from 'jsonwebtoken'
import env from '../env'

const p = getPool()

const validateUser = (params) => {
    let statusCode= 200
    if(!params.username)
    {
        statusCode = 400
    } else if (!params.password)
    {
        statusCode = 401
    }
    return statusCode
}

const updateUser = (params) => {
    let query = {

    }
    if(params.type == "login")
    {
        query.text = 'UPDATE "user" SET last_login = $1 WHERE id = $2' 
        query.values = [`now()` , `${params.userId}`]
    }
    return Rx.Observable
        .fromPromise(p.query(query))
}

const loginUser = (params) => {

    const query = {
        text: 'SELECT id FROM "user" WHERE username = $1 and password = $2 LIMIT 1',
        values: [
            `${params.username}`,
            `${params.password}`
        ]
    }
    params.type = "login"

    return Rx.Observable
        .fromPromise(p.query(query))
        .map(res => {
            params.userId = res.rows[0].id
        })
        .switchMap(res => updateUser(params) )
        .map(res => {
            let statusCode = "200"
            let final = Response.setJson("User", statusCode)
            final.data = {
                token: jwt.sign({username: params.username, id: params.userId }, env.jwtKey)
            }
            return final
        })

}

const registerUser = (params) => {
    console.log("insert param " , params);

        const now = new Date()
        const query = {
            text: 'INSERT INTO "user" ("username", "password","created_at") ' +
                   'VALUES($1, $2,$3) RETURNING id',
            values: [
            `${params.username}`,
            `${params.password}`,
            `now()`
            ],
        }
      


        return Rx.Observable
            .fromPromise(p.query(query))
            .map(res => {
                const userId = res.rows[0].id
                const query2 = {
                    text: 'INSERT INTO "account" ("account_number", "user_id") ' +
                           'VALUES($1, $2) ',
                    values: [
                        Math.floor(Math.random() * 1000000) + 1000000,
                        userId
                    ],
                }             
                                
                Rx.Observable.fromPromise(p.query(query2))
                let statusCode = "200"
                let final = Response.setJson("User", statusCode)
                return final
            })
            // .switchMap(data => Rx.Observable.from(data))
        

}


module.exports = {
    loginUser,
    registerUser,
    validateUser
}
