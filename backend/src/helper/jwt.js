const jwt = require("jsonwebtoken")

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1hr"})
}

const verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET, (error, decoded)=>{
        if(error){
            return {status: "error", message: "something went wrong while verifying token !"}
        }else{
            return {status: "ok", data: decoded}
        }
    } )
}

module.exports = {
    generateToken,
    verifyToken
}