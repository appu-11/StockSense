import React from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import "./homepage.css";
import { useEffect } from "react";
import { News } from "./styles.js"
import { Newscard } from "../newscard/newscard.js"
import { Common } from "../common/common.js"

const Homepage = () => {
    
    const [data, setData] = React.useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080").then((res) => {
            console.log(res.data.final);
            setData(res.data.final);
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
    if(!data) return null;

    return (
        <Layout>
            {/* <section className="charts">
                <Common item = {data2[0]} ind = {0}/>
                <Common item = {data2[1]} ind = {1}/>
            </section> */}
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