import React, {useState} from "react";
import axios from "axios";
import "./login.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/auth.js";
const Login = () => {
    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();
    
    const [user, setUser] = useState({
        email: "", 
        password: ""
    })

    const updateuser = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async() => {
        const {email, password} = user;
        try{
            if(email && password){
                const res = await axios.post("http://localhost:8080/api/auth/login", {email, password});
                if (res.data.success) {
                  setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                  });
                  localStorage.setItem("auth", JSON.stringify(res.data));
                  navigate("/");
                }
                else {
                    alert("Invalid credentials")
                    window.location.reload(false);
                }
            }
            else {
                alert("Fill all the fields");
                
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const signup = () => {
        navigate("/signup");
    }
    return (
        <div className="container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="hh3">Login</h3>
            <div className="text-center mt-2">
              Not registered yet?{" "}
              <span className="link-primary" onClick={signup}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-5">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email" value={user.email} onChange={updateuser}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password" value={user.password} onChange={updateuser}
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary" onClick={login}>
                Submit
              </button>
            </div>
            <p className="text-center mt-3">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
     
    )
}

export default Login;