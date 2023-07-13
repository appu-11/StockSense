import mongoose, { version } from "mongoose";

const searchSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    symbol: {
        type:String,
        required: true,
        unique: true
    },
    exchange: {
        type:String,
        required: true
    }
},{versionKey: false})

export default mongoose.model("stock_data", searchSchema);