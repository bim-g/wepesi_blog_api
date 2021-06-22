require("dotenv/config");
const express =require("express");
const swaggerUi = require('swagger-ui-express');
const path = require("path");
const mangoose =require("mongoose");
// 
const docs = require('./swagger.json');
const v1= require("./route/v1");
// 

const app=express();
// 
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(express.static(path.join(__dirname, 'public')));
/**
 * swagger doc api
 */
app.use("/api/api-doc/v1", swaggerUi.serve, swaggerUi.setup(docs));
/**
 * api routing
 */
app.use("/api/v1",v1);
app.get("/",(req,res)=>{
    res.status(200).json({
        status:200,
        message:"Welcome to Wepesi Blog API v1"
    });
});
/**
 * check if the route is not define
 */
app.use('**', (req, res, next) => {
    res.status(200).send({
        status: 405,
        message: 'Resource requested not found on the server'
    });
});

/**
 * test connection on mongodb
 */
mangoose.connect(process.env.DB_CONFIG,()=>{
    console.log("connection to database success");
}).catch(er=>{
    console.error(er);
});
let port = process.env.PORT || 3578;
app.listen(port,()=>{
    console.log(`server run on port ${port}, on http://localhost:${port}/api/api-doc/v1`);
});