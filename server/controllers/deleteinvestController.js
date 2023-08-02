import userstockModel from '../models/userstockModel.js';

export const deleteinvestController = async (req, res) => {
    try{
        const {quantity, companysymbol, date, email, price} = req.body;
        const user = await userstockModel.findOneAndDelete({email, companysymbol, price, date, quantity});
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