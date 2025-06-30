
import Submission from "../models/formSchema.js";



export const formsubmission=async (req,res) => {
    try{
        const form=new Submission(req.body)
        form.save()
        res.status(201).json({
            messege:"Form Submitted",
            form
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}


export const getallform=async (req,res) => {
    try{
        const forms=await Submission.find()
        res.status(200).json({
            messege:"Forms are",
            forms
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            messege:"Internal Server Error"

        })
    }
    
}