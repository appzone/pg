import Code from './code'

class Response {
    static setResponse(res, error, body) {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send(body)
        }
    }

    static setModule(subName, statusCode) {
        const data = Code[subName][statusCode]
        return data
    }

    static setJson(subName, statusCode, reqId) {
        const data = {
            statusCode,
            statusMessage: Code[subName][statusCode],
            reqId,
        }

        return data
    }
}

export default Response
