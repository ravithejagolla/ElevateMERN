import env from 'dotenv'
env.config()
import express from 'express'
import { connect } from 'mongoose'
import { router } from './routers/formRouter.js'



const app=express()
app.use('/form',router)
app.use(express.json())


const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL


app.listen(PORT,async () => {
    try{
        await connect(MONGO_URL)
        console.log("Mongodb Connected")
        console.log(`Serevr Running on ${PORT}`)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
    
})