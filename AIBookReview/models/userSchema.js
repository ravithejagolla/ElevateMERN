
import  {Schema,model} from 'mongoose'

const userschema=new Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userschema.virtual('books',{
    ref:"Book",
    localField:"_id",
    foreignField:"userid"
})

userschema.virtual('reviews',{
    ref:"Review",
    localField:"_id",
    foreignField:"userid"
})

const User=model('user',userschema)


export default User