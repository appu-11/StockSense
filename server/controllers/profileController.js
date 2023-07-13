import userstockModel from "../models/userstockModel.js";

export const profileController = async (req, res) => {
    try{
        const {email} = req.body;
        const data = await userstockModel.find({email});
        var fin = [];
        for(var i=  0; i < data.length; i++){
           const temp = {
                companysymbol:data[i].companysymbol,
                price:data[i].price,
                quantity:data[i].quantity,
                date:data[i].date,
           }
           fin.push(temp);
        }
        const mpp = new Map();
        for(var i = 0; i < fin.length; i++) {
            const t = fin[i];
            if(mpp.has(t.companysymbol)){
                mpp.get(t.companysymbol).push(t);
            }
            else{
                mpp.set(t.companysymbol,[t]);
            }
        }
        console.log(mpp);
        res.status(201).send({
            success:true,
            message:"Profile data extracted",
            data: fin,
        })
    }
    catch(error){
        console.log(error);
        console.log("Error in profile controller");
        res.status(500).send({
            success:false,
            message:"Error in profile controller"
        })
    }
};