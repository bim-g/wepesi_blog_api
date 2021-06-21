const express =require("express");
const swaggerUi = require('swagger-ui-express');
const path = require("path");
// 
const docs = require('./swagger.json');
const v1= require("./route/v1");
// 

const app=express();
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/api-doc/v1", swaggerUi.serve, swaggerUi.setup(docs));
app.use("api/",v1);
app.get("/",(req,res)=>{
    res.status(200).json({
        status:200,
        message:"Welcome to Wepesi Blog API v1"
    });
});
app.use('**', (req, res, next) => {
    res.status(200).send({
        status: 405,
        message: 'Resource requested not found on the server'
    });
});
let port = process.env.PORT || 3578;
app.listen(port,()=>{
    console.log(`server run on port ${port}, on http://localhost:${port}/api/api-doc/v1`);
});