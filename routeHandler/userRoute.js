const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = require('../schema/userSchema')
const jwt = require('jsonwebtoken')
const User = new mongoose.model("User", userSchema)

// signup route
router.post('/signup', async(req, res) => {
    try{
        const hashpassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashpassword
        
    });
    await newUser.save()
    res.status(200).json({
        message: 'signup was successfull'
    })
    }
    catch{
        res.status(200).json({
            message: "Todo Was inserted successfully"
        })
    }
})

// login router
router.post('/login', async (req, res) => {
    try{
    const user = await User.find({ username : req.body.username, })
    if(user && user.length > 0){
        const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)
        if(isValidPassword){
        
            // generate token
            const token = jwt.sign({
                username: user[0].username,
                userId: user[0]._id
            }, process.env.JWT_SECRET, {
                expiresIn:'1h'
            } )
            res.status(200).json({
                "access-toker": token,
                message:'logeed in successfully'
            })

        }
        else{
            res.status(401).json({
                "error":"Authentication is failed"
            })
        }
    }
    else{
        res.status(401).json({
            "error":"Authentication is failed"
        })
    }
}
catch{
    res.status(401).json({
        "error":"Authentication is failed"
    })
}
})

module.exports = router