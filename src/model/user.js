import Rx from 'rxjs/Rx'
import  { connectDb, getPool } from './dbConn'
import Response from '../response'

const p = getPool()


const insertUser = (params) => {
    console.log("insert param " , params);
    
        const now = new Date()
        const query = {
            text: 'INSERT INTO "user" ("username", "password","created_at") ' +
                   'VALUES($1, $2,$3)',
            values: [
            `${params.username}`,
            `${params.password}`,
            `now()`
            ],
        }

        return Rx.Observable
            .fromPromise(p.query(query))
            .map(res => {
                console.log("RES" , res.rowCount)
                let statusCode = "200"
                let final = Response.setJson("RegisterUser", statusCode)
                return final
            })
            // .switchMap(data => Rx.Observable.from(data))
        

}


module.exports = {
    insertUser
}
