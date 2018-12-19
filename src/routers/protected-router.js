import Express from 'express'
import { registerUser, validateUser, loginUser } from '../model/user'
import Response from '../response'
import mongoConn from '../model/mongoConn'
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken'
import env from '../env'
import { decode } from 'punycode';


const router = Express.Router()
mongoConn.mongoConn()

const verifyTokenAndGetUID = (token) => {
    try {
        return jwt.verify(token, env.jwtKey)
    }
    catch(err ){
        return "ERROR"
    }
}

export const  isUserAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(403).json({
          status: 403,
          message: 'FORBIDDEN'
        })
      } else {
        const token = authHeader.split("Bearer ")[1]
        if (token) {
           let decodedData =  verifyTokenAndGetUID(token)
           if(decodedData != "ERROR")
           {
               req.body.userId = decodedData.id
               next()
           }
           else {
            return res.status(403).json({
                status: 403,
                message: 'FORBIDDEN'
              })                   
           }
        } else {
          return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN'
          })
        }
      }
}

// module.exports = isUserAuthenticated
