import Express from 'express'
import { insertUser } from '../model/user'

const router = Express.Router()


router.get('/test', (req, res)=> {
        let params = {
                username: "ddd",
                password: "abc"
        }
        console.log("before insert");
        insertUser(params);
        res.send("Oke");
});

module.exports = router;
