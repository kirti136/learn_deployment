const express = require('express');

const userRouter = express.Router()
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


// registration
userRouter.post("/register", async (req, res) => {
    const { name, email, password, location, age } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (hash) {
                const user = new UserModel({ name, email, password: hash, location, age })
                await user.save()
                res.status(200).send({ "msg": "Registration successful" })
            } else {
                res.status(400).send({ "msg": err.message })
            }
        });
    } catch (error) {
        res.status(400).send({ "msg": "Registration Failed", "error": error.message })
    }
})

// login route BY USING FIND ONE and token expires in 1min{ expiresIn: '60000' }
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        // console.log(user);
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login successful", "token": jwt.sign({ "userID": user._id }, 'hello') })
                } else {
                    res.status(400).send({ "msg": "Wrong Password" })
                }
            })
        } else {
            res.status(400).send({ "msg": "Email Not Found" })
        }
    } catch (error) {
        res.status(400).send({ "msg": "Login Failed", "error": error.message })
    }
})

//  Login route BY USING FIND
// userRouter.post("/login", async (req, res) => {
//     try {
//         const user = await UserModel.find({ email })
//         if (user.length > 0) {
//             bcrypt.compare(password, user[0].password, (err, result) => {
//                 if (result) {
//                     res.status(200).send({ "msg": "Login successful", "token": jwt.sign({ name: 'kirti' }, 'hello', { expiresIn: '30000' }) })
//                 } else {
//                     res.status(400).send({ "msg": "Invalid Password" })
//                 }
//             })
//         } else {
//             res.status(400).send({ "msg": "Email Not Found" })
//         }
//     } catch (error) {
//         res.status(400).send({ "msg": "Login Failed", "error": error.message })
//     }
// })

module.exports = {
    userRouter
}
