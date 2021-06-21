const express= require("express");
// 
const users=require("./users");
const articles=require("./articles");
const route=express.Router();
// 
route.use("/users",users)
        .use("/articles",articles)


module.exports= route;