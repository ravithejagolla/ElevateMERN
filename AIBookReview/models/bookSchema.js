

import { Schema,model } from "mongoose";

const bookschema=new Schema({
    name:String,
    genre:{
        type:String,
        required:true
    },
    price:Number,
    authorname:String
})

bookschema.virtual('reviews',{
    ref:"Review",
    localField:"_id",
    foreignField:"bookid"
})
bookschema.virtual('tags',{
    ref:"Tag",
    localField:"_id",
    foreignField:"bookid"
})

const Book=model('book',bookschema)

export default Book