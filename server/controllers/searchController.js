import searchModel from "../models/searchModel.js";

export const searchController = async(req, res) => {
    try{
        const {inputValue} = req.body;
        const t = await searchModel.find({name: {$regex: `^${inputValue}`, $options:"i"}}).exec();
        var fin = [];
        var uniqueNames = new Set();
        for (var i = 0; i < Math.min(10, t.length); i++) {
            var name = t[i].name;

            if (!uniqueNames.has(name)) {
                fin.push({name: t[i].name, exchange: t[i].exchange, symbol: t[i].symbol});
                uniqueNames.add(name);
            }
        }
        res.status(200).send({
            success: true,
            message: "Search controller working fine",
            data: fin,
        });

    }
    catch{
        res.status(500).send({
            success: false,
            message: "Error in search controller"
        });
    }
};