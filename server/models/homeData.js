import mongoose from "mongoose";

const homeData = mongoose.Schema({
    date:{
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    close: {
        type:String,
        required: true,
    },
},{timestamps: true})

export default mongoose.model("homeData", homeData);