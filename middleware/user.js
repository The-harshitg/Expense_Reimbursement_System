// //middleware//user.js
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { User } = require("../db");

async function userMiddleware(req,res,next){
    const token = req.headers.authorization
    
    
    try {
        const decode = jwt.verify(token,JWT_SECRET);
        if(decode.email){
            const user = await User.findOne({ email: decode.email });

            if (!user) {
                return res.status(404).send({ error: "User not found." });
            }

            // Attach the user object to the request object
            req.user = user;
            next();
        }
        else{
            res.status(401).send({error:"You are not authorized to access this route."})
        }
        
    } catch (error) {
        res.json({
            msg: "incorrect inputs"
        })
    }
        

    
}
module.exports = userMiddleware;