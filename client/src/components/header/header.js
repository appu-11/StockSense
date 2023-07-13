import React from "react";
import { useState } from "react";
import "./header.css";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import SearchComponent from "./search";

const Header = () => {

    const [auth, setAuth] = useAuth();
    const logout = () => {
        setAuth({
            ...auth,
            user:null,
            token:""
        })
        localStorage.removeItem("auth");
    }
    // https://finnhub.io/docs/api/symbol-search  for search feature
    return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <NavLink className="navbar-brand" >
                            <Link to={"/"} className={"nav-link"}>
                                StockSense
                            </Link>
                        </NavLink>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name = "search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                        <SearchComponent/>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                        !auth.user ? (
                                            <>
                                                <li className="nav-item ">
                                                    <NavLink to={"/signup"} className={"nav-link "}>
                                                        Signup
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink to={"/login"} className={"nav-link "}>
                                                        Login
                                                    </NavLink>
                                                </li>
                                            </>
                                        ):(
                                            <>
                                                <li className="nav-item ">
                                                    <NavLink to={"/profile"} className={"nav-link "} id = "logout">
                                                        Profile
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink onClick={logout} to="/" className={"nav-link "} id="logout">
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </>
                                        )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Header;