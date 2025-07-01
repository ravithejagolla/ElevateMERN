
import env from 'dotenv'
env.config()
import express from 'express'
import { connect } from 'mongoose'
import userRouter from './routers/userRouter.js'
import reviewRouter from './routers/reviewRouter.js'
import tagRouter from './routers/tagRouter.js'
import bookRouter from './routers/bookRouter.js'



const app=express()
app.use(express.json())

app.use('/user',userRouter)
app.use('/review',reviewRouter)
app.use('/book',bookRouter)
app.use('/tag',tagRouter)



const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL

app.listen(PORT,async () => {
    try{
        await connect(MONGO_URL)
        console.log("Mongodb Connected")
        console.log(`Serever  Running on ${PORT}`)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
    
})