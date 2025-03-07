const jwt = require("jsonwebtoken")

const authenticateUser = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    
    if(!token){
        return res.status(401).json({message:"User Unauthorized"})

    }
    try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedToken.userId;
            next()
    } catch (error) {
        console.log("🚀 ~ authenticateUser ~ error:", error)
        res.status(403).json({ message: "Forbidden" });
    }
}

module.exports = {
    authenticateUser
}