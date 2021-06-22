const Users = require("../models/Users");
const userController={
    getUsers:async(req,res)=>{
        let users=await Users.find().then().catch(er=>{
            return res.status(200).json({
                status:500,
                message:"error server"
            });
        });
        res.status(200).json({
            status:200,
            Response:users
        });
    },
    createUser:async(req,res)=>{
        let {
            fist_name,
            last_name,
            sexe,
            username,
            password
        }=req.body;
        let user =  new Users({
                fist_name:fist_name,
                last_name:last_name,
                sexe:sexe,
                username:username,
                password:password
            });
      
            let saveduser=await user.save().then().catch(er=>{                
                        console.error("------exeption",ex);
                        return res.status(200).json({
                            status: 500,
                            message: "error server"
                        });
                    });
            res.status(200).json({
                status: 200,
                Response: saveduser
            });
    }
};

module.exports=userController;