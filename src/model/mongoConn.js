import Mongoose from 'mongoose';
import config from '../env'

Mongoose.connect(config.mongoConnString,  { useNewUrlParser: true }, (error) => {
    console.log("connecting")
    if(error){
        console.log("ERR " , error);
    } else {
        console.log('Mongoose connected successfully.');
    }
})


const mongoConn = () => {
    console.log("OK")
}
    // Log: require('./models/log')

module.exports = {
    mongoConn,
    Log: require('./log')
}
