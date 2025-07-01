import {Router} from 'express'
import { register,login,allusers } from "../controllers/userController.js";

const router=Router()


router.post('/regiter',register)
router.post('/login',login)
router.get('/users',allusers)



export default router