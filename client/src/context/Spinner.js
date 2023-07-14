import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {

    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        },1000);
        count === 0 && navigate("/login", { state: { from: location.pathname } });
        return () => clearInterval(interval);
    }, [count, navigate, location]);
    
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <h1 className="Text-center">redirecting to login in {count}</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
};
export default Spinner;