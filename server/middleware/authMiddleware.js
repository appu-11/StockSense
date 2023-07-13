import { Jwt } from "jsonwebtoken";

export const requireSignin = async (req, res, next) => {
    try {
        const decode = Jwt.verify(req.headers.authorization, process.env.jwt_secret);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}