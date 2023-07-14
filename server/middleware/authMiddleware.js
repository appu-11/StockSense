import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.jwt_secret);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        console.log("Error in requireSignin");
    }
}