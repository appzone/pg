const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

var schema = new Schema({
    logData : String,
    reqId   : String,
    createdAt    : { type : Date, default : Date.now },
    updatedAt    : { type : Date, default : Date.now },
    creator      : { type : String, default : 'System' },
    updater      : { type : String, default : 'System' },
    status       : { type : String, default : 'active' }
});

schema.index({
    status : 1
});

class Log {

    static createLog({ logData, reqId}, callback) {
        this.create({
            logData, reqId
        }, callback);
    }

}

schema.loadClass(Log);

module.exports = Mongoose.model('Log', schema);
