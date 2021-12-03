const express = require('express');
const {json , urlencoded} = express;
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');


dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)



app.use(cors())
app.use(json())
app.use(urlencoded({extended : false}));


const authRouter = require('./routes/auth');
const campRouter = require('./routes/camps');

app.use('/api/auth' , authRouter);
app.use('/api/camps' ,campRouter);

app.use(errorHandler);
app.all('*' , (req , res)=>{
    res.status(404).json({error : "Resource not found"})
})


const port = process.env.PORT || 5000;

app.listen(port , ()=>{
    console.log(`Server started on port ${port}`)
})
