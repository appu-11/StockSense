import mongoose from "mongoose";

const userstockSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    companysymbol:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
},{timestamps: true})

export default mongoose.model("userstockData", userstockSchema);
