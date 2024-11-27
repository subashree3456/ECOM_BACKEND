import express from 'express'
import {ProductCreate , Update , DeleteProduct , GetProduct} from "../controllers/Product.js"

const ProductRoutes=express.Router()


ProductRoutes.post('/create/:userId' ,ProductCreate)
ProductRoutes.put('/update/:id',Update)
ProductRoutes.delete('/delete/:id',DeleteProduct)
ProductRoutes.get('/getProducts/:userId',GetProduct)
export default ProductRoutes



