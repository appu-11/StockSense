import userstockModel from "../models/userstockModel.js";
import userWatchlistModel from "../models/userWatchlistModel.js";


export const profileController = async (req, res) => {
    let maxDate;
    const yahoodata = async (company, minDate) => {
        try{
            maxDate = minDate;
            let dates = [];
            let data = {};
            for(var i = 0; i < company.length; i++) {
                let s = company[i].split(".");
                let temp = s[0];
                if(s.length > 1){
                    if(s[1] === "BSE"){
                        temp = temp + ".BO";
                    }
                    else{
                        temp = temp + ".NS";
                    }
                }
                const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${temp}/1d?diffandsplits=false`;
                console.log("called an api");
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': `${process.env.yahoo_api}`,
                        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                    }
                };
                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    const keys = Object.keys(result.items).reverse();
                    let t = {};
                    let ind = 100;
                    let ttt;
                    for(let i = 0; i < keys.length; i++){
                        const timestamp = parseInt(keys[i], 10);
                        const t = new Date(timestamp* 1000);
                        ttt = t;
                        if (t <= minDate){
                            ind = i;
                            break;
                        }
                    }
                    for(let i = 0; i < ind + 1; i++) {
                        const re = result.items[keys[i]];
                        let tt = {
                            open: re.open,
                            high: re.high,
                            close: re.close,
                            low: re.low,
                        };
                        let ff = new Date(re.date);
                        ff.setDate(ff.getDate() + 1);
                        // console.log(ff, re.date);
                        let ss = ff.toISOString().split("T")[0];
                        t[ss] = tt;
                        dates.push(ff);
                    }
                    data[company[i]] = t;
                } catch (error) {
                    console.error(error);
                }
            }
            maxDate = new Date(Math.max.apply(null, dates));
            return data;
        }
        catch(error){
            console.log(error);
            console.log("error in yahoo data function");
        }
    };

    const getgraphdata = (minDate, data5, fin) => {
        let tempdate = minDate;
        let graphdata = [];
        let prev = 0;
        let gg = [];
        for(let i = 0; i < fin.length; i++){
            gg.push(0);
        }
        while(tempdate < maxDate){
            // console.log(tempdate);
            let total = 0;
            for(let i = 0; i < fin.length; i++){
                const t = fin[i];
                const t_date = new Date(t.date);
                if(t_date <= tempdate){
                    let ss = tempdate.toISOString().split("T")[0];
                    if(data5[t.companysymbol].hasOwnProperty(ss) && data5[t.companysymbol][ss].close !== 0){
                        let arr = t.companysymbol.split(".");
                        if(arr.length > 1){
                            const tt = data5[t.companysymbol][ss].close * t.quantity
                            total += tt;
                            gg[i] = tt;
                        }
                        else{
                            const tt = data5[t.companysymbol][ss].close * t.quantity * 82;
                            total += tt;
                            gg[i] = tt;
                        }
                    }
                    else{
                        total += gg[i];
                    }
                }
            }
            const time = tempdate.toISOString().split("T")[0];
            const val = (total === 0 ? prev : total);
            prev = val;
            const temp = {
                time: time,
                value: val,
            }
            graphdata.push(temp);
            tempdate.setDate(tempdate.getDate() + 1);
        }
        return graphdata;
    };

    try{
        const {email} = req.body;
        let totalbuyprice = 0;
        const data = await userstockModel.find({email});
        var fin = [];
        let dates = [];
        let companybuyprice = {};
        let companyquantity = {};
        for(var i = 0; i < data.length; i++){
            const temp = {
                companysymbol:data[i].companysymbol,
                price:data[i].price,
                quantity:data[i].quantity,
                date:data[i].date,
                }
            let arr = data[i].companysymbol.split(".");
            if(arr.length > 1){
                totalbuyprice += data[i].price;
            }
            else{
                totalbuyprice += data[i].price * 82;
            }
            let s = data[i].companysymbol;
            if(companybuyprice.hasOwnProperty(s)){
                if(arr.length > 1){
                    companybuyprice[s] += data[i].price;
                }
                else{
                    companybuyprice[s] += data[i].price * 82;
                }
                companyquantity[s] += data[i].quantity;
            }
            else{
                if(arr.length > 1){
                    companybuyprice[s] = data[i].price;
                }
                else{
                    companybuyprice[s] = data[i].price * 82;
                }
                companyquantity[s] = data[i].quantity;
            }
            fin.push(temp);
            dates.push(new Date(data[i].date));
        }
        companybuyprice["totalbuyprice"] = totalbuyprice;
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
        const mppObject = Object.fromEntries(mpp);
        const company = Object.keys(mppObject);

        let mppObject1 = {};
        const watchdata = await userWatchlistModel.find({email});
        var watch = [];
        for(var i = 0; i < watchdata.length; i++){
            watch.push(watchdata[i].companysymbol);
        }
        let minDate = new Date(Math.min.apply(null,dates));
        let data5 = await yahoodata(company, minDate);
        let graphdata = getgraphdata(minDate, data5, fin);
        for(let i = 0; i < company.length; i++){
            let fk = Object.keys(data5[company[i]])[0];
            mppObject1[company[i]] = data5[company[i]][fk].close;
        }
        // let tempdate = minDate;
        // let graphdata = [];
        // let prev = 0;
        // let gg = {};
        // for(let i = 0; i < fin.length; i++){
        //     gg[i] = 0;
        // }
        // while(tempdate < maxDate){
        //     // console.log(tempdate);
        //     let total = 0;
        //     for(let i = 0; i < fin.length; i++){
        //         const t = fin[i];
        //         const t_date = new Date(t.date);
        //         if(t_date <= tempdate){
        //             let ss = tempdate.toISOString().split("T")[0];
        //             if(data5[t.companysymbol].hasOwnProperty(ss)){
        //                 let arr = t.companysymbol.split(".");
        //                 if(arr.length > 1){
        //                     const tt = data5[t.companysymbol][ss].close * t.quantity
        //                     total += tt;
        //                     gg[i] = tt;
        //                 }
        //                 else{
        //                     const tt = data5[t.companysymbol][ss].close * t.quantity * 82;
        //                     total += tt;
        //                     gg[i] = tt;
        //                 }
        //             }
        //             else{
        //                 total += gg[i];
        //             }
        //         }
        //     }
        //     const time = tempdate.toISOString().split("T")[0];
        //     const val = (total === 0 ? prev : total);
        //     prev = val;
        //     const temp = {
        //         time: time,
        //         value: val,
        //     }
        //     graphdata.push(temp);
        //     tempdate.setDate(tempdate.getDate() + 1);
        // }
        const tempgraphdata = [{
            time: "2021-01-01",
            value: 20000,
        },
        {
            time: "2021-02-01",
            value: 24500,
        },{
            time: "2021-05-01",
            value: 30000,
        },{
            time: "2022-01-01",
            value: 40000,
        },{
            time: "2022-04-01",
            value: 36000,
        },{
            time: "2022-11-01",
            value: 30000,
        },{
            time: "2023-01-01",
            value: 20000,
        },{
            time: "2023-02-01",
            value: 27000,
        },{
            time: "2023-03-01",
            value: 35000,
        },{
            time: "2023-04-01",
            value: 49000,
        },{
            time: "2023-05-01",
            value: 37000,
        }
    ];
        const combineddata = {companybuyprice, companyquantity};
        res.status(201).send({
            success:true,
            message:"Profile data extracted",
            data: fin,
            data2: mppObject,
            data3: mppObject1,
            data4: watch,
            data5,
            data6: graphdata,
            data7: combineddata,
        })

    }catch(error){
        console.log(error);
        console.log("Error in profile controller");
        res.status(500).send({
            success:false,
            message:"Error in profile controller"
        })
    }
};