
import { Schema,model } from "mongoose";


const tagschema=new Schema({
    tagname:{
        type:String,
        enum:["bestseller","classic","biography"]
    },
    bookid:{
        type:Schema.Types.ObjectId,
        ref:"Book"
    }
})

const Tag=model('tag',tagschema)

export default Tag