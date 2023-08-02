import userWatchlistModel from "../models/userWatchlistModel.js";

export const watchlistController = async (req, res) => {
    try {
        const { companysymbol, email, add } = req.body;

        if (add === false) {
            var user = await userWatchlistModel.findOneAndDelete({ email, companysymbol });
            if (user) {
                return res.status(200).send({
                success: true,
                message: "Removed from watchlist"
                });
            } else {
                return res.status(200).send({
                success: true,
                message: "Not in watchlist"
                });
            }
        } 
        else {
            var user = await userWatchlistModel.findOne({ email, companysymbol });
                if (user) {
                return res.status(200).send({
                success: true,
                message: "Already in watchlist"
                });
            } else {
                user = await new userWatchlistModel({
                email,
                companysymbol
                }).save();
                return res.status(201).send({
                success: true,
                message: "Added to watchlist",
                });
            }
        }
    } catch (error) {
        console.log(error);
        console.log("Error in watchlist controller");
        res.status(500).send({
        success: false,
        message: "Error in watchlist controller"
        });
    }
};
