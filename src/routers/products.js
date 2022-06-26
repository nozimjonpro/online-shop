import { Router } from "express";
import controller from '../controllers/products.js'

const router = Router()

router.get('/products', controller.GET);

router.get('/products/:productid', controller.GET);

router.post('/products', controller.POST)

export default router;

