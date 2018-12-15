import PgApp from './pgapp'
// import { connectDb } from '../model/dbConn'

const PgCommon = {
    lib: {
        PgApp,
    },
    init: () => {
        console.log("init");
        // connectDb()
    },
}

module.exports = PgCommon
