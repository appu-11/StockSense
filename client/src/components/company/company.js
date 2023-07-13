import React, { useEffect, useState, useRef } from "react";
import Layout from "../layout/layout.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Chart from "./Chart.js";
import "./company.css"
import { useAuth } from "../../context/auth.js";

const CompanyName = () =>{
    const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem("auth"));
    // const username = user["user"]["username"];
    const [auth, setAuth] = useAuth();
    const {companysymbol} = useParams();

    const [data, setData] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [numberOfStocks, setNumberOfStocks] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [totalPrice, settotalPrice] = useState(0);
    const [validDate, setValidDate] = useState(false);


    useEffect(() => {
        const timestamp = Date.now();
        axios.post(`http://localhost:8080/api/company`,{companysymbol, timestamp}).then((res) => {
            setData(res.data);
        }).catch(err => {
            console.log(err);
            console.log("hn mein error huin");
        });
    },[companysymbol]);

    useEffect(() => {
        if (selectedDate && numberOfStocks) {
            const [yearr, monthh, dayy] = selectedDate.split("-");
            const day = parseInt(dayy);
            const month = parseInt(monthh);
            const year = parseInt(yearr);
            const date = {
                day,
                month,
                year,
            }
            const targetIndex = data.data.findIndex(obj => obj.time === selectedDate);
            console.log(data.data);
            console.log(date);
            console.log(targetIndex);
            if(targetIndex === -1){
                setValidDate(false);
            }
            else{
                const price = data.data[targetIndex].close * numberOfStocks;
                setValidDate(true);
                settotalPrice(price);
            }
        } else {
            settotalPrice(0);
        }
    }, [selectedDate, numberOfStocks]);

    if(!data) return null;
    const handleAdd = () => {
        if(auth.user === null){
            alert("Please login to add stocks");
            navigate("/login");
        }
        else{
            setNumberOfStocks(0);
            setSelectedDate("");
            setShowModal(true);
        }
    };

    const handleConfirm = async() => {
        try {
            if(validDate === false){
                alert("Please select a valid date")
            }
            else{
                const quantity = +numberOfStocks;
                console.log(typeof(selectedDate));
                const res = await axios.post(`http://localhost:8080/api/addstock`,
                {companysymbol, quantity, selectedDate, email:auth.user.email, price:totalPrice});
                if(res.data.success){
                    setNumberOfStocks(0);
                    setSelectedDate("");
                    setShowModal(false);
                }
                else{
                alert("Try again");
                }
        }
        } catch (error) {
            console.log(error);
            console.log("error in adding stocks");
        }
        
        
    };

    return (
        <Layout>
            <div className="aa">
                {companysymbol}
                <Chart data = {data.data}/>
                <button className="btn btn-primary" onClick={handleAdd}>Add</button>
            </div>
            {
                showModal && (
                    <div className="Modal-background">
                        <div className="Modal">
                            <div className="Modal-body">
                                <h2 className="mt-2">Add Stocks</h2>
                                <label htmlFor="stocks">
                                    Number of Stocks:
                                </label>
                                <input
                                    type="Number"
                                    id = "stocks"
                                    value={numberOfStocks}
                                    onChange={(e) => setNumberOfStocks(e.target.value)}
                                />
                                <label htmlFor="date">
                                    Date:
                                </label>
                                <input
                                    type="date"
                                    id = "date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                <input
                                    type = "text"
                                    id = "price"
                                    value={totalPrice}
                                    readOnly
                                />
                                <div className="Modal-actions">
                                    <button className="btn btn-primary" onClick={() => {setShowModal(false)}}>Cancel</button>
                                    <button className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Layout>
    );

}
export default CompanyName;