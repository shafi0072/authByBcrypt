const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = require('../schema/userSchema')
const User = new mongoose.model("User", userSchema)


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

module.exports = router