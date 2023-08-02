export const Gainercard = (data) =>{

    let d = [];

    for (const [key, value] of data.companydata) {
        const gain = (((data.data.companyquantity[key] * value) - (data.data.companybuyprice[key]))/ (data.data.companybuyprice[key]) * 100).toFixed(2);
        d.push({name:key, gain});
    }

    const sorted = d.sort((a, b) => b.gain - a.gain);
    const topGainers = sorted.slice(0, 5);
    const rsorted = d.sort((a, b) => a.gain - b.gain);
    const topLosers = rsorted.slice(0, 5);
    
    return(
        <div className="major">
            <div className="gainers">
                Top Gainers
                <div className="gainer">
                    {
                        topGainers.map((item, index) => {
                            return(
                                <div className="gainer-item" key={index}>
                                    <span>{item.name}:&nbsp;&nbsp; {item.gain}%</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="losers">
                Top Losers
                <div className="loser">
                    {
                        topLosers.map((item, index) => {
                            return(
                                <div className="loser-item" key={index}>
                                    <span>{item.name}:&nbsp;&nbsp; {item.gain}%</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};