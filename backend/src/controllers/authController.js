const bcrypt = require("bcryptjs")
const User = require("../models/User");
const { generateToken } = require("../helper/jwt");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name, email, password: hashedPassword
        })
        await user.save()
        res.status(201).json({ message: "User created" })
    } catch (error) {
        if (error.code === 11000) {
            res.json({ status: "error", message: "Email is already exist!" })
        } else {
            res.json({ status: "error", message: error.message });
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body()
    try {
        const user = await User.findOne({ email })

        if (!user || await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        const token = generateToken()
        console.log("🚀 ~ login ~ token:", token)
        res.json({ token, message: "loged in successfully" })
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
}

module.exports= {
    login,
    signup
}