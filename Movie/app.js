

import env from 'dotenv'
env.config()
import express from 'express'
import bookRouter from './routers/bookRouter.js'
import { connect } from 'mongoose'



const app=express()
app.use(express.json())


app.use('/book',bookRouter)



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