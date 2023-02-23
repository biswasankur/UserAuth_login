const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVarified:{
        type:Boolean,
        default:true
    },
})

const usermodel=new mongoose.model('user',userSchema)
module.exports=usermodel
