import mongoose from "mongoose";

const userwatchlistSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    companysymbol:{
        type: String,
        required: true,
    },
})

export default mongoose.model("userwatchlist", userwatchlistSchema);
