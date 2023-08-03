import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Layout from "../layout/layout.js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import {CloseButton} from 'react-bootstrap'
import {UserCard} from './UserCard.js'
import Graph from './Graph.js'
import { BouncingBalls } from "react-cssfx-loading";
import {Gainercard} from "./gainercard.js";

const Profile = () =>{
    const [data, setData] = useState([]);
    const [data2, setData2] = useState(new Map());
    const [data3, setData3] = useState(new Map());
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState(null);
    const [data6, setData6] = useState([]);
    const [data7, setData7] = useState({});
    const [selectedAccordion, setSelectedAccordion] = useState("-");
    const [prevSelectedAccordion, setPrevSelectedAccordion] = useState("-");


    const user = JSON.parse(localStorage.getItem("auth"));

    useEffect(() => {
        const email = user.user.email;
        axios.post(`http://localhost:8080/api/profile`, { email })
        .then(res => {
            setData(res.data.data);
            const mapData2 = new Map();
            Object.entries(res.data.data2).forEach(([companysymbol, values]) => {
                mapData2.set(companysymbol, values);
            });
            setData2(mapData2);
            const mapData3 = new Map();
            Object.entries(res.data.data3).forEach(([companysymbol, values]) => {
                mapData3.set(companysymbol, values);
            });
            setData3(mapData3);
            setData4(res.data.data4);
            setData5(res.data.data5);
            setData6(res.data.data6);
            setData7(res.data.data7);

        })
        .catch((error) => {
            console.log(error);
            console.log("Error in extracting profile data");
        });
    },[]);

    useEffect(() => {
        if(selectedAccordion !== "-" && selectedAccordion === prevSelectedAccordion) {
            setSelectedAccordion("-");
            setPrevSelectedAccordion("-");
        }
        
    }, [selectedAccordion, prevSelectedAccordion]);
    
    if(!data || !data2 || !data3 || !data4) return (
        <div className = "outer-balls">
            <div className="balls">
                <BouncingBalls/>
                <span>Loading...</span>
            </div>
        </div>
    );
    if(Object.keys(data7).length === 0) return (
        <div className = "outer-balls">
            <div className="balls">
                <BouncingBalls/>
                <span>Loading...</span>
            </div>
        </div>
    );
    // console.log(data6);
    
    const InvestCard = ({ item, companysymbol, data3 }) => {
        const user = JSON.parse(localStorage.getItem("auth"));
        const [showCloseButton, setShowCloseButton] = useState(false);
        const handledelete = async() => {
            try{
                const res = await axios.post(`http://localhost:8080/api/deleteinvest`, { companysymbol, date: item.date, email: user.user.email, price: item.price, quantity: item.quantity });
                let dat = new Map();
                data2.forEach((value, key) => {
                    if(key === companysymbol){
                        for(let i=0; i<value.length; i++){
                            if(value[i] === item) {
                            }
                            else{
                                if(dat.has(companysymbol)){
                                    dat.get(companysymbol).push(value[i]);
                                }
                                else{
                                    dat.set(companysymbol, [value[i]]);
                                }
                            }
                        }
                    }
                    else{
                        if(dat.has(companysymbol)){
                            dat.get(companysymbol).push(value);
                        }
                        else{
                            dat.set(companysymbol, value);
                        }
                    }
                });
                setData2(dat);
            }
            catch(error){
                console.log(error);
                console.log("Error in deleting investment");
            }
            window.location.reload()
        }
        return (
            <div
            className="invest-card"
            onMouseEnter={() => setShowCloseButton(true)}
            onMouseLeave={() => setShowCloseButton(false)}
            >
            <div>
                Date: {item.date}, Price: {item.price}, Quantity: {item.quantity}, close: {data3.get(companysymbol)}
            {showCloseButton && <CloseButton className="delete-inv-button" onClick={handledelete}/>}
            </div>
            </div>
        );
    };

    const textStyle = {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "2vh",
    }

    const handleclickcompany = (companysymbol) => {
        setPrevSelectedAccordion(selectedAccordion);
        setSelectedAccordion(companysymbol);
    };

    return (
        <Layout>
            <div className="whole">
                <div className="tabs">
                    <div className="top-invest-tab">
                        <div className="invest-area">
                        <Tabs
                            defaultActiveKey="investments"
                            transition={false}
                            id="noanim-tab-example"
                            >
                            <Tab eventKey="investments" title="Investments">
                            <Accordion style={{ width: "50vw" }} className="investments">
                                {Array.from(data2.entries()).map(([companysymbol, values]) => (
                                <Accordion.Item key={companysymbol} eventKey={companysymbol} onClick={()=>handleclickcompany(companysymbol)}>
                                    <Accordion.Header>{companysymbol}</Accordion.Header>
                                    <Accordion.Body>
                                    <div>
                                            {
                                                values.map((item) => (
                                                    <InvestCard item={item} companysymbol={companysymbol} data3={data3} />
                                                ))
                                            }
                                        </div> 
                                    </Accordion.Body>
                                </Accordion.Item>
                                ))}
                            </Accordion>
                            </Tab>
                            <Tab eventKey="watchlist" title="Watchlist">
                                <Accordion style={{width: "50vw"}} className="watchlist">
                                    {data4.map((item, index) => (
                                        <Accordion.Item key={index} eventKey={index.toString()}>
                                            <Accordion.Header>{item}</Accordion.Header>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Tab>
                        </Tabs>
                        </div>
                        <div className="details-area">
                            <div className="details-outer">
                                {selectedAccordion !== "-" && <span style={textStyle}>{selectedAccordion}</span>}
                                <UserCard data = {data7} companysymbol = {selectedAccordion} companydata = {data3} />
                            </div>
                        </div>
                    </div>
                    <div className="user-graph-div">
                        <div className="user-graph-card" id = "thisgraph">
                            {data6 && data6.length && <Graph data={data6}/>}
                        </div>
                    </div>
                </div>
                <div className="second">
                    <Gainercard companydata = {data3} data = {data7}/>
                </div>
            </div>

        </Layout>
    );

}
export default Profile;