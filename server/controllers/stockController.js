import userstockModel from '../models/userstockModel.js';

export const stockController = async (req, res) => {
    try{
        const { companysymbol, quantity, selectedDate,email, price} = req.body;
        const add = await new userstockModel({
            email, companysymbol, price, date:selectedDate, quantity
        }).save();
        res.status(201).send({
            success: true,
            message: "Stock added successfully",
        });
    }
    catch(error){
        // console.log(error);
        console.log("error in stock controller");
    }
};