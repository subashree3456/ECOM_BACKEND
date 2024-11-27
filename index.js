import express from 'express'
import dotenv from 'dotenv'
import Dbcon from "./libs/db.js"
import AuthRoutes from './routes/Auth.js'
import ProductRoutes from './routes/Product.js'
import cors from 'cors';

dotenv.config()

const PORT =  process.env.PORT || 8000
const app =express()

Dbcon()
app.use(cors("*"));
app.use(express.json())
app.use('/auth', AuthRoutes)
app.use('/product',ProductRoutes)

app.get("/",(req,res)=>{
    res.send('hello from backend')
})

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})