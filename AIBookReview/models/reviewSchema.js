
import { Schema,model } from "mongoose";

const reviewschema=new Schema({
    review:String,
    rating:{
        type:String,
        min:1,
        max:5
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    bookid:{
        type:Schema.Types.ObjectId,
        ref:"Book"
    }
})

const Review=model('review',reviewschema)

export default Review
