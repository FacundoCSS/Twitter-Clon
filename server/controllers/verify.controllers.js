import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config()


export const verifyToken = async (req , res , next) => {

    try {
        const token = req.headers['x-access-token']
        if(token === undefined || token === null || token === "") {
            return res.json({
                status: false,
                message: "You hasn't access to this data"
            })
        }
    
        const auth = await jwt.verify(token , process.env.secret);
        if(!auth) {
            return res.json({
                status: false,
                message: "You hasn't access to this data"
            })
        }
        req.userId = auth.id;
    
        next();
    } catch (error) {
        console.log(error)
    }
}

 