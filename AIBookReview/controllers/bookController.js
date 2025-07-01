import Book from '../models/bookSchema.js'



export const createbook=async (req,res) => {
    try{
        const newbook=new Book(req.body)
        newbook.save()
        res.status(201).json({
            messege:"Book Created Succefully",
            newbook
        })
    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })

    }   
}

export const getbooks=async  (req,res)=> {
    try{
        
        const books=await Book.find()
        const averagebooks=await Book.find({$avg:{rating}}).populate('reviews')
        const totalbooks=await Book.find().countDocuments()
        res.status(200).json({
            messege:"Available Books are",
            books,
            averagebooks,
            totalbooks
        })
    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}


export const updatebook=async (req,res) => {
    const id=req.params.id
    try{
        const upadatebook=await Book.findByIdAndUpdate(id,{$set:req.body})
        req.status(200).json({
            messege:"Book Updated Success"
        })

    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}


export const deletebook=async (req,res) => {
    const id=req.params.id
    try{
        const deletedbook=await Book.findByIdAndDelete(id)
        req.status(200).json({
           messege:"Book Deleted Success" 
        })

    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}



export const topreviedbooks=async (req,res) => {
    const n=req.query
    try{
        const topreview= await Book.aggregate(
        {
           $lookup:{
            from:"Review",
            localField:"_id",
            foreignField:"bookid",
            as :"Review Details"
           },
            $addFields:{
                reviewcount:{$size:"$Review Details"}
            },
           $sort:{reviewcount:-1},
           $limit:n
        })
        res.status(200).json({
            messege:"TopNreviewBooks",
            topreview
        })
    }catch(e){
        console.log(e)
         res.status(500).json({
            messege:"Internal Server Error"
        })
    }
    
}
