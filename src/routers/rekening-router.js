import Express from 'express'
import {
    historyHandler, transactionHandler, blokirHandler, updateHandler, aktivasiHandler,
} from '../handler/rekeningHandler'

const router = Express.Router()

router.post('/history', historyHandler)

router.post('/deposit', transactionHandler)
router.post('/transfer', transactionHandler)
router.post('/withdraw', transactionHandler)

router.post('/blokir', blokirHandler)

router.post('/update', updateHandler)

router.post('/aktivasi', aktivasiHandler)

export default router
