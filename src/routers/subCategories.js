import { Router } from "express";
import controller from '../controllers/subcategories.js'

const router = Router()

router.get('/subcategories', controller.GET);

router.post('/subcategories', controller.POST)


export default router;

