import { Router } from "express";
import controller from '../controllers/user.js'

const router = Router()

router.post('/login', controller.LOGIN)


export default router;
