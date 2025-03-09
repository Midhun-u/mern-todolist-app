import { Router } from "express"
import {sign , login , logout} from '../controllers/auth.controller.js'
const router = Router()

//route for sign
router.post("/sign" , sign)

//route for login
router.post("/login" , login)

//route for logout
router.post("/logout" , logout)


export default router