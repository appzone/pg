import Mongoose from 'mongoose'
import config from '../env'
import Log from './log'

Mongoose.connect(config.mongoConnString, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log('ERR ', error)
    } else {
        console.log('Mongoose connected successfully.')
    }
})


const mongoConn = () => {
}

module.exports = {
    mongoConn,
    Log,
}
