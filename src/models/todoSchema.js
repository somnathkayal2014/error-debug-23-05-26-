import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  token:{
    type:String,
    default:null,
  },
  Password: {
    type: String,
    required: true,
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  isLoggedIn:{
    type:Boolean,
    default:false, 
  }
},{timestamps:true});
export default mongoose.model("cls2", todoSchema); 
 