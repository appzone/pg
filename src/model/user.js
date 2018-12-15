import Rx from 'rxjs/Rx'
import connectToPg from './dbConn'

const insertUser = (params) => {
    console.log("insert param " , params);
    
        const now = new Date()
        const query = {
            name: 'insert-user',
            text: `INSERT INTO user
                        (
                            username, password, created_at
                        )
                        VALUES
                        (
                            $1, $2, $3
                        )`,
            values: [
            `${params.username}`,
            `${params.password}`,
            `${now}`,
            ],
        }

        // return connectToPg()
        //     .switchMap((pgClient) => {
        //         console.log("PG " ,pgClient)
        //     return Rx.Observable
        //         .fromPromise(pgClient.query(query))
        //         .finally(() => {
        //             console.log("OK");
        //             pgClient.release()
        //         })
        //         .catch((err) => {
        //             console.log(`Error insert user ` , params);
        //         })
        //     })
        // }
        connectToPg().then((client) => {
            console.log("query " , query)
            console.log("c " , client)
            client.query(query)
        })
}

module.exports = {
    insertUser
}
