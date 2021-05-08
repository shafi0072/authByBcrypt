const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routeHandler/userRoute')
const PORT = 5000

const app = express()

app.use(express.json())


// connection DB 
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log('db connected'))
.catch(err => console.log(err))

app.use('/user', userRoute)



// error handler 
function errorHandler (err, req, res, next){
    if(req.headerSent){
        return next(err)
    }
    res.status(500).json({error: err});
}

app.listen(PORT, () => {
    console.log(`your app is running on port number ${PORT}`);
})
