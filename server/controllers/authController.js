import userModel from '../models/userModel.js'
import { hashPassword, comparePassword } from '../helper/authHelper.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        console.log(req.body);
        const existinguser = await userModel.findOne({email});
        if(existinguser) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            username, email, password: hashedPassword
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    }
    catch(error){
        res.status(500).json({message: "Error in registerController"});
    }
}

export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(200).send({
            success: false,
            message: "Email is not registerd",
          });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }
        const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {expiresIn: "7d"});
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
            },
            token,
          });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in loginController",
          error,
        });
    }
}

