const User = require("../model/User");
const jwt = require("jsonwebtoken");
const {expressjwt} = require("express-jwt");
const bcrypt = require("bcrypt");
// require('cookie-parser')

JWT_SECRET = "23"

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");

        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email, password: encryptedPassword
        })
        res.status(200).json(user);
    } catch (error) {
        //  res.json(error.message)
        res.status(400).json({
            error: "Please enter your email and password"
            //    }
        })
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ status: 'error', error: 'Invalid username/password' })
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (passwordcompare) {
            // the username, password combination is successful

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                JWT_SECRET,
                {
                    expiresIn: 86400 // expires in 24 hours
                }
            )
            return res.json({ user, token: token })
        } else {
            return res.json({ status: 'error', error: 'Check the password again' })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.isSignedIn = expressjwt({
    secret: JWT_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})