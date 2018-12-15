import Code from './code'

class Response {

    

    static setResponse = (res, error, body) =>{
        if(error)
        {
            res.status(500).send(error)
        } else {
            res.send(body)
        }
        
    }

    static setJson = (subName, statusCode,reqId ) => {
        let data = {
            statusCode,
            statusMessage : Code[subName][statusCode],
            reqId
        }

        return data
    }



}

module.exports = Response