
import Review from '../models/reviewSchema.js'




export const createreview=async (req,res)=> {
    try{
        const newreview=new Review(req.body)
        newreview.save()
        res.status(201).json({
            messege:"Review Created"
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}


export const updatereview=async (req,res) => {
    const id=req.params.findByIdAndUpdate
    try{
        const updatereview=await Review.findByIdAndUpdate(id,{$set:req.body})
        updatereview.save()
        res.status(200).json({
            messege:"Review Updated"
        })

    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })

    }
    
}


export const deletereview=async (req,res) => {
    const id=req.params.id
    try{
        const deletedreview=await Review.findByIdAndDelete(id)
        res.status(200).json({
            messege:"Review Deleted Sucess"
        })
    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }   
}