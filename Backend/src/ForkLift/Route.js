//PC_NO_8
// Importing express framework anf functions
const express = require("express");
const {GetServiceCenterData,SearchTrailerDetails,GetTrailerDetails,GetTrailerDetailsById,UpdateTrailerDetails,InsertTrailerDetails,DeleteTrailerDetailsById} = require('./Controller');

// Creating a instance variable for Router from express
const Router = express.Router();

//Creating middleware to check the endpoints

//PC_NO_10
Router.get('/getservicecenterdata',GetServiceCenterData);

//PC_NO_16
Router.post('/gettrailerdetails',GetTrailerDetails);

//PC_NO_36
Router.post('/deletetrailerdetailsbyid',DeleteTrailerDetailsById);

//PC_NO_34
Router.post('/inserttrailerdetails',InsertTrailerDetails);

//PC_NO_51
Router.get('/gettrailerdetailsbyid/:id',GetTrailerDetailsById);

//PC_NO_70
Router.post('/updatetrailerdetails',UpdateTrailerDetails);

//Exporting Router
module.exports = {Router};
