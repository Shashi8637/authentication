const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')




dotenv.config();

const port = process.env.PORT;

const app = express();

const authRoute = require('./routes/auth_route')
const session = require('express-session');

//middleware
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.JWT_SECRET, // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for production with HTTPS
  }));


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use('/api',authRoute);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})