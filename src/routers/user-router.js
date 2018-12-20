import Express from 'express'
import { loginHandler, registerHandler } from '../handler/userHandler'

const router = Express.Router()

router.post('/login', loginHandler)

router.post('/register', registerHandler)

export default router
