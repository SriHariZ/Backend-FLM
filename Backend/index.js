//PC_NO_7
// Importing required functions and framework
const { response } = require("express");
const express = require("express");
const {Router} = require('./src/ForkLift/Route');

//Creating instance variable for express framework
const app = express();

//Creating a middleware to check the request is in JSON format
app.use(express.json());

//Initailzing CORS Policy 
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

//PC_NO_15
//Creating middleware to check the domain name
app.use('/forklift',Router);

//Defining the connection port number
app.listen(4000,()=>{
    console.log("Sucess");
})

