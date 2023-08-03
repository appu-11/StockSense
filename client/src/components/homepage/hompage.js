import React from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import "./homepage.css";
import { useEffect } from "react";
import { News } from "./styles.js"
import { Newscard } from "../newscard/newscard.js"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Indexgraph from "./IndexGraph.js";
import { BouncingBalls } from "react-cssfx-loading";

const Homepage = () => {
    
    const [data, setData] = React.useState(null);
    const [index, setIndex] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState("NIFTY");
    
    useEffect(() => {
        axios.get("http://localhost:8080").then((res) => {
            console.log(res.data.final);
            setData(res.data.final);
            setIndex(res.data.index);
        })
        // eslint-disable-next-line
    },[])

    const randomIndexes = [];

    if(data){
        while (randomIndexes.length < 4) {
            const randomIndex = Math.floor(Math.random() * data.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
    }
    if(!data || !index) return (
        <div className = "outer-balls">
            <div className="balls">
                <BouncingBalls/>
                <span>Loading...</span>
            </div>
        </div>
    );

    // NSEI, BSESN, NDX, SDX, DJI
    

    return (
        <Layout>
            <div className="Index">
                <div className="index-area">
                <Tabs
                        activeKey={activeTab} // Set the active tab based on the state
                        onSelect={(tab) => setActiveTab(tab)} // Update active tab state when a tab is selected
                        transition={false}
                        id="noanim-tab-example"
                    >
                        <Tab eventKey="NIFTY" title="NIFTY" className="index-graph">
                            {activeTab === "NIFTY" && <Indexgraph data={index[0]} />}
                        </Tab>
                        <Tab eventKey="SENSEX" title="SENSEX" className="index-graph">
                            {activeTab === "SENSEX" && <Indexgraph data={index[1]} />}
                        </Tab>
                        <Tab eventKey="NASDAQ" title="NASDAQ" className="index-graph">
                            {activeTab === "NASDAQ" && <Indexgraph data={index[2]} />}
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <div className="latnews">Latest News</div>
            <News>
                <Newscard item = {data[randomIndexes[0]]}/>
                <Newscard item = {data[randomIndexes[1]]}/>
                <Newscard item = {data[randomIndexes[2]]}/>
                <Newscard item = {data[randomIndexes[3]]}/>

            </News>
        </Layout>
    )
}

export default Homepage;