//middleware//admin.js
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { Admin } = require("../db");



async function adminMiddleware(req,res,next){
    const token = req.headers.authorization
    
    
    try {
        const decode = jwt.verify(token,JWT_SECRET);
    
        if(decode.email){
          
            const admin = await Admin.findOne({ email: decode.email });
            console.log(admin);

            if (!admin) {
                return res.status(404).send({ error: "User not found." });
            }

            // Attach the user object to the request object
            req.admin = admin;
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
module.exports = adminMiddleware;