import React, {useState} from "react";
import "./signup.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
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

    const signup = async () => {
        const {username, email, password} = user;
        console.log(user);
        try{
            if(username && email && password){
                const res = await axios.post("http://localhost:8080/api/auth/signup", {email, password, username});
                if(res && res.data.success){
                    navigate("/");
                }
                else{
                    navigate("/login");
                }
            }
            else {
                alert("Fill all the fields");
            }
        }
        catch(error){
            alert("error");
            console.log(error);
        }
    }

    const change = () => {
        navigate("/login");
    }

    return (
    //     <div className="signup">
    //         <div className="card">
    //             <h2>Sign Up</h2>
    //             <div className="input">
    //                 <input type="text" name="username" value = {user.username} className="inname" placeholder="Username" required="required" onChange={updateuser}/>
    //                 <input type="text" name="email" value={user.email} className="inemail" placeholder="Email" required="required" onChange={updateuser}/>
    //                 <input type="password" name="password" value={user.password} className="inpass" placeholder="Password" required="required" onChange={updateuser}/>
    //             </div>
    //             <div>
    //                 {/* <button type="submit" onClick={signup}>Signup</button> */}
    //                 <button type="button" class="btn btn-primary" onClick={signup}>Signup</button>
    //             </div>
    //         </div>
    //    </div>
    <div className="container">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="hh3">Sign up</h3>
        <div className="text-center mt-2">
          Already a User?{" "}
          <span className="link-primary" onClick={change}>
            Login
          </span>
        </div>
        <div className="form-group mt-4">
          <label>Username</label>
          <input
            type="username"
            className="form-control mt-1"
            placeholder="Enter Username"
            name="username" value={user.username} onChange={updateuser}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            name="email" value={user.email} onChange={updateuser}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            name="password" value={user.password} onChange={updateuser}
            required
          />
        </div>
        <div className="d-grid gap-2 mt-4">
          <button type="submit" className="btn btn-primary" onClick={signup}>
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
    )
}

export default Signup;