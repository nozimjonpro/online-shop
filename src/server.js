import express from 'express';
import categoriesRouter from './routers/categories.js';
import userRouter from './routers/user.js'
import subcategoriesRouter from './routers/subCategories.js';
import productsRouter from './routers/products.js'

const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json())

app.use(categoriesRouter)

app.use(subcategoriesRouter)

app.use(productsRouter)

app.use(userRouter)

app.use((error, req, res, next)=>{

})

app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))