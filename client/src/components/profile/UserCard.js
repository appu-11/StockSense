import "./UserCard.css"
import CircleProgressBar from "./circle.js";

export const UserCard = (data) => {
    console.log(data);
    const price = (data.companysymbol === "-"? 0 : data.companydata.get(data.companysymbol));
    let percentage = 100;

    if (data.companysymbol !== "-") {
        percentage = ((data.data.companybuyprice[data.companysymbol] / data.data.companybuyprice.totalbuyprice) * 100).toFixed(2);
    }

    const gain = (((data.data.companyquantity[data.companysymbol] * price) - (data.data.companybuyprice[data.companysymbol]))/ (data.data.companybuyprice[data.companysymbol]) * 100).toFixed(2);

    return(
        <>
            <div className="details">
                <div className="Pie-chart">
                    <>
                        <CircleProgressBar data = {percentage}/>
                        <span>{percentage}%</span>
                    </>
                </div>
                <div className="maths">
                    <span>Total Value:&nbsp;
                    {
                        data.companysymbol === "-"?(
                            <span>&#8377; {(data.data.companybuyprice.totalbuyprice).toFixed(2)}</span>):
                        (
                            <span>&#8377; {(data.data.companybuyprice[data.companysymbol]).toFixed(2)}</span>
                        )
                    }
                    </span>
                    {data.companysymbol !== "-" && 
                        <>
                            <span>Current Value:
                            &#8377; {(data.data.companyquantity[data.companysymbol] * price).toFixed(2)}
                            </span>
                        </>
                    }
                    {
                        price !== 0 && 
                        <span>Current Price:  &#8377; {price}</span>
                    }
                    {
                        data.companysymbol !== "-" &&
                        (
                            <>
                                <span>Total Gain: {gain}%
                                {   (gain > 0) ? (<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z"/></svg>)
                                    :(<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M384 352c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v82.7L342.6 137.4c-12.5-12.5-32.8-12.5-45.3 0L192 242.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0L320 205.3 466.7 352H384z"/></svg>)
                                }
                                </span>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};