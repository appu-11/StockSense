import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Layout from "../layout/layout.js";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.js";

const Profile = () =>{
    const [auth, setAuth] = useAuth();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState(new Map());
    const [closeData, setCloseData] = useState(new Map());
    const user = JSON.parse(localStorage.getItem("auth"));
    useEffect(()=>{
        const email = user.user.email;
        axios.post(`http://localhost:8080/api/profile`,{email}).then((res) => {
            const d = res.data.data2;
            console.log("working profile");
            setData(res.data.data);
            const mapData2 = new Map();
            Object.entries(res.data.data2).forEach(([companysymbol, values]) => {
                mapData2.set(companysymbol, values);
            });
            setData2(mapData2);
            setData2(res.data.data2);
            const companySymbols = Object.keys(data2);
            console.log(companySymbols);
            axios.post(`http://localhost:8080/api/profile/close`,{companySymbols}).then((res) => {
                console.log(res.data.message);
            }).catch((error) =>{
                console.log(error);
                console.log("Error in extracting close data");
            });
        }).catch((error) =>{
            console.log(error);
            console.log("Error in extracting profile data");
        })
    },[]);
    
    
    if(!data || !data2) return <div>Loading...</div>;
    
    return (
        <Layout>
            <div className="container">
                {
                    Object.entries(data2).map(([companysymbol, values]) => (
                        <div key={companysymbol}>
                          <h3>{companysymbol}</h3>
                          <ul>
                            {values.map((item) => (
                              <li key={item.date}>
                                Date: {item.date}, Price: {item.price}, Quantity: {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                    ))
                }
                {/* <ul>
                    {data.map(item => {
                        return (
                            <>
                                <Link to={`/${item["companysymbol"]}`}>{item["companysymbol"]}</Link>
                                <li>{item["price"]}</li>
                                
                            </>
                        );
                    })}
                </ul> */}
            </div>

        </Layout>
    );

}
export default Profile;