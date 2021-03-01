require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');


//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");


//DB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tshirt",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED")
});

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);


// CONFIGURATION
if(process.env.NODE_ENV === 'production'){
    app.use(express.static( 'projfrontend/build' ))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'projfrontend', 'build', 'index.html'))
    })
}


//PORT
const port = process.env.PORT || 8000;

//Starting the server
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
});