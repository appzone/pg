import { Mongoose, Schema } from 'mongoose'


const schema = new Schema({
    logData: String,
    reqId: String,
    module: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    creator: { type: String, default: 'System' },
    updater: { type: String, default: 'System' },
    status: { type: String, default: 'active' },
})

schema.index({
    status: 1,
})

class Log {
    static createLog({ logData, reqId, module }, callback) {
        this.create({
            logData, reqId, module,
        }, callback)
    }
}

schema.loadClass(Log)

module.exports = Mongoose.model('Log', schema)
