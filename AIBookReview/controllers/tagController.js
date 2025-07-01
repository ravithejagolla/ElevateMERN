
import Tag from '../models/tagSchema.js'

export const createtag=async (req,res) => {
    try{
        const  newtag=new Tag(req.body)
        newtag.save()
        res.status(201).json({
            messge:"Tag Created"
        })
    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}

export const alltags=async (req,res) => {
    try{
        const tages = await Tag.find()
        res.status(200).json({
            messege:"All Tages",
            tages
        })
    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }
}