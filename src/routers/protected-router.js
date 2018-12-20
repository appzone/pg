import jwt from 'jsonwebtoken'
import mongoConn from '../model/mongoConn'
import env from '../env'

mongoConn.mongoConn()

const verifyTokenAndGetUID = (token) => {
    try {
        return jwt.verify(token, env.jwtKey)
    } catch (err) {
        return 'ERROR'
    }
}

const isUserAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            const decodedData = verifyTokenAndGetUID(token)
            if (decodedData !== 'ERROR') {
                req.body.userId = decodedData.id
                next()
            }
        }
    } else {
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN',
        })
    }
}

export default isUserAuthenticated
