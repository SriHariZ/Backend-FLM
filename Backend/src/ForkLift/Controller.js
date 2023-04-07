//PC_NO_9
// Importing required module
//Creating a instance variable for mssql module
const { response } = require('express');
const mssql = require('mssql');

//Creating a instance variable to define the database connection
let dBConnect = new mssql.ConnectionPool({
    server:'localhost',
    user:'sa',
    database:'ForkLift',
    password:'Admin@123',
    options:{
        trustServerCertificate:true
    }
})

//PC_NO_11
//Creating a function to get Service Center data
const GetServiceCenterData = async(request,response) =>{
    await dBConnect.connect();
    let query = `Select * from ServiceCenter`;

    let result = await dBConnect.query(query);
    console.log(result);
    await dBConnect.close();
    response.send(result.recordset);
}

//PC_NO_17
// Creating a function to get all the Trailer Details
const GetTrailerDetails = async(request,response) =>{
    await dBConnect.connect();
    const offset = (request.query.start) * 4; 
    console.log(request.query.order)
    let query = `SELECT * FROM ForkLift Inner Join ServiceCenter on ForkLift.ServiceCenterId = ServiceCenter.ServiceCenterId 
                    WHERE Supervisor LIKE '%${request.query.value}%' and isActive = 1
                    order by TrailerNumber ${request.query.order}
                    offset ${offset} rows fetch next 4 rows only`;
                    console.log(query)
    let result = await dBConnect.query(query);
    await dBConnect.close();

    await dBConnect.connect();
    let query1 = `SELECT COUNT(*) AS TotalValues FROM ForkLift WHERE Supervisor LIKE '%${request.query.value}%' and isActive = 1`;
    let result1 = await dBConnect.query(query1);
    await dBConnect.close();
    if(result.rowsAffected[0] !==0)
    {
        result.recordset[0].TotalValues = result1.recordset[0].TotalValues
    }
    
    console.log(result.recordset);

    response.send(result.recordset);
}

//PC_NO_37
//Creating a function to delete the Trailer Details
const DeleteTrailerDetailsById = async(request,response) =>{
    await dBConnect.connect();
    let query = `UPDATE ForkLift SET isActive = 0 WHERE TrailerNumber = ${request.query.id}`;

    let result = await dBConnect.query(query);
    await dBConnect.close();
    response.send(result);
}

//PC_NO_35
//Creating a function to insert Trailer Details
const InsertTrailerDetails = async(request,response) =>{
    await dBConnect.connect();
    let query = `INSERT INTO ForkLift (TrailerNumber,ServiceCenterId ,Supervisor,AccidentDate,AccidentTime,TrailerArrivedFrom,DriverName ,
        LiftTruckNumber,OperatorName ,DescriptionOfDamage,DescriptionOfWhatHappened) VALUES (${request.body.TrailerNumber}
            ,${request.body.ServiceCenterId},'${request.body.Supervisor}', '${request.body.AccidentDate}', '${request.body.AccidentTime}', '${request.body.TrailerArrivedFrom}', 
            '${request.body.DriverName}', ${request.body.LiftTruckNumber}, '${request.body.OperatorName}', 
            '${request.body.DescriptionOfDamage}' ,'${request.body.DescriptionOfWhatHappened}')`;
            console.log(query)

    let result = await dBConnect.query(query);
    await dBConnect.close();
    response.send(result);
}

//PC_NO_52
//Creating a function to get particular trailer details
const GetTrailerDetailsById = async(request,response) =>{
    await dBConnect.connect();
    let query = `SELECT * FROM ForkLift WHERE TrailerNumber = ${request.params.id}`;

    let result = await dBConnect.query(query);
    console.log(result)
    await dBConnect.close();
    response.send(result.recordset);
}

//PC_NO_71
//Creating a function to update Trailer Details
const UpdateTrailerDetails = async(request,response) =>{
    await dBConnect.connect();
    let query = `update ForkLift set ServiceCenterId = ${request.body.ServiceCenterId}, Supervisor = '${request.body. Supervisor}',AccidentDate = '${request.body.AccidentDate}',AccidentTime = '${request.body.AccidentTime}', TrailerArrivedFrom = '${request .body.TrailerArrivedFrom}', DriverName ='${request.body .DriverName}',LiftTruckNumber = ${request.body.LiftTruckNumber} ,OperatorName= '${request.body. OperatorName}',DescriptionOfDamage= '${request.body.DescriptionOfDamage}' ,DescriptionOfWhatHappened= '${request. body.DescriptionOfWhatHappened}' where TrailerNumber =${request.body.TrailerNumber}`;

    let result = await dBConnect.query(query);
     await dBConnect.close();
    response.send(result);  
}


//Exporting the functions
module.exports = {GetServiceCenterData,GetTrailerDetailsById,GetTrailerDetails,UpdateTrailerDetails,InsertTrailerDetails,DeleteTrailerDetailsById};