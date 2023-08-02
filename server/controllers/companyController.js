export const companyController = async(req, res) => {
    try{
        const {companysymbol} = req.body;
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${companysymbol}&outputsize=full&apikey=${process.env.alpha_vantage_api}}`;
        const response = await fetch(url);
        const data = await response.json();
        var t = Object.keys(data["Time Series (Daily)"]);
        console.log(t.length);
        var final = [];
        for(var i = t.length - 1; i >= 0; i--) {
            const arr = t[i].split("-");
            const d = {
                year: arr[0],
                month: arr[1],
                day: arr[2],
            }
            const temp = {
                time: d,
                open: parseFloat(data["Time Series (Daily)"][t[i]]["1. open"]),
                high: parseFloat(data["Time Series (Daily)"][t[i]]["2. high"]),
                low: parseFloat(data["Time Series (Daily)"][t[i]]["3. low"]),
                close: parseFloat(data["Time Series (Daily)"][t[i]]["4. close"]),
            }
            final.push(temp);
        }
        res.status(200).send({
            success: true,
            message: "Company controller working fine", 
            data: final,
        });
    }
    catch(error){
        console.log("Error in company controller");
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error in company controller",
        });
    }
};