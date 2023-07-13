import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Layout from "../layout/layout.js";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.js";

const Profile = () =>{
    const [auth, setAuth] = useAuth();
    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem("auth"));
    useEffect(()=>{
        const email = user.user.email;
        axios.post(`http://localhost:8080/api/profile`,{email}).then((res) => {
            console.log("working profile");
            // console.log(res.data.data);
            setData(res.data.data);
            console.log(data);
        }).catch((error) =>{
            console.log(error);
            console.log("Error in extracting profile data");
        })
    },[]);
    // when i have this code and refresh my profile page i get error Cannot read properties of null (reading 'username') but when i go back and come again on profile page i dont get error how to handle this
    if(!data) return <div>Loading...</div>;
    console.log(data);
    return (
        <Layout>
            <div className="container">
                hello
                Welcome, {user.user.username}
                <ul>
                    {data.map(item => {
                        return (
                            <>
                                <Link to={`/${item["companysymbol"]}`}>{item["companysymbol"]}</Link>
                                <li>{item["price"]}</li>
                                
                            </>
                        );
                    })}
                </ul>
            </div>

        </Layout>
    );

}
export default Profile;