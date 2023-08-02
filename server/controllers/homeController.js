import fetch from "node-fetch";
import axios from "axios";

export const homeController = async(req, res) => {
    try{
        // news data
        const url = `https://newsdata.io/api/1/news?apikey=${process.env.news_data_api}&q=Stock%20Market&country=in&language=en&category=business,politics`
        // const url = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=VAVN9Y1KY6TDA7PJ"
        const response = await fetch(url);
        const data = await response.json();
        var t = data.results;
        var final = [];
        for(var i = 0; i < 10; i++) {
            const temp = {
                title: t[i].title,
                link: t[i].link,
                image: t[i].image_url,
                description: t[i].description,
                source: t[i].source_name,
                date: t[i].date,
            }
            final.push(temp);
        }
        
        
//https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=sensex&apikey=XYZ symbols




        // chart data
        // var final2 = [];

        // const url2 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=HDFCBANK.BSE&outputsize=compact&apikey=${process.env.alpha_vantage_api}`
        // const response2 = await fetch(url2);
        // const data2 = await response2.json();
        // var t1 = Object.keys(data2["Time Series (Daily)"]);
        // // var common = [];
        // var first = [];
        // for(var i = 0; i < 50; i++) {
        //     var temp = [];
        //     temp.push(t1[i]);
        //     var temp2 = [];
        //     temp2.push(parseFloat(data2["Time Series (Daily)"][t1[i]]["1. open"]));
        //     temp2.push(parseFloat(data2["Time Series (Daily)"][t1[i]]["2. high"]));
        //     temp2.push(parseFloat(data2["Time Series (Daily)"][t1[i]]["3. low"]));
        //     temp2.push(parseFloat(data2["Time Series (Daily)"][t1[i]]["4. close"]));
        //     temp.push(temp2);
        //     first.push(temp);
        // }



        // HomeData
        // axios.get('https://api.marketstack.com/v1/tickers/aapl/eod', {params})
        // .then(response => {
        //     const apiResponse = response.data;
        //     if (Array.isArray(apiResponse['data'])) {
        //         apiResponse['data'].forEach(stockData => {
        //             console.log(`Ticker ${stockData['symbol']}`,`has a day high of ${stockData['high']}`,`on ${stockData['date']}`);
        //         });
        //     }
        // }).catch(error => {
        //     console.log(error);
        // });
        console.log("HERE");
        const l = ["NSEI", "BSESN", "NDX", "SDX", "DJI"];
        let index = [];
        for(let i = 0; i < 3; i++) {
            try{
                const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/^${l[i]}/1d?diffandsplits=false`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': `${process.env.yahoo_api}`,
                        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                    }
                };
                const response = await fetch(url, options);
                const result = await response.json();
                const keys = Object.keys(result.items);
                let final = [];
                for(let i = 0; i < keys.length; i++) {
                    const timestamp = parseInt(keys[i], 10);
                    const t = new Date(timestamp* 1000);
                    const re = result.items[keys[i]];
                    let ff = new Date(re.date);
                    ff.setDate(ff.getDate() + 1);
                    // console.log(ff, re.date);
                    let ss = ff.toISOString().split("T")[0];
                    if(ss === "2022-10-24" || re.close === 0) continue;
                    let fin = {
                        time: ss,
                        value: re.close,
                    };
                    final.push(fin);
                }
                index.push(final);
            } catch (error) {
                console.error(error);
            }
        }
        
        //send response
        
        res.status(201).send({
            success: true,
            message: "News fetched successfully",
            final,
            index,
        });
    }
    catch(error){
        // console.log(error);
        console.log("Error in homeController");
        res.status(500).send({
            success: false,
            message:"Error in homeController",
        });
    }
}