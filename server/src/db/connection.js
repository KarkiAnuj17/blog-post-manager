import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const res = await  mongoose.connect('mongodb://127.0.0.1:27017/blogdb');
        if(res) console.log("connected to mongodb")
    }catch(err){
        console.log(err)
    }
}