const Users = require("../models/Users");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
// 
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
    getUsersById:async(req,res)=>{
        let users=await Users.findById(req.params.user_id).then().catch(er=>{
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
                password: await bcrypt.hash(password, 10)
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
    },
    loginUsers: async (req, res) => {
        let {username,password}=req.body;
        let users = await Users.findOne({
                username:username
            }).then().catch(er => {
            return res.status(200).json({
                status: 500,
                message: "error server"
            });
        });
        if(users){
            let is_logged = await bcrypt.compare(password, users.password);
            if(is_logged){
                const token = jwt.sign({
                    user_id: users._id,
                    username: users.username
                },
                process.env.TOKEN_SECRET_KEY, {
                    expiresIn: process.env.TOKEN_EXPIRE
                });
                return res.status(200).json({
                    status: 200,
                    Response: {
                        token,
                        users
                    }
                });
            }
            return res.status(200).json({
                status: 404,
                message: "username or password not correct"
            });
        }
        return res.status(200).json({
            status: 404,
            message: "user does not exist"
        });
    },
    deleteUsersById: async (req, res) => {
        let users = await Users.deleteOne({
                _id: req.params.user_id
            }).then().catch(er => {
            return res.status(200).json({
                status: 500,
                message: "error server"
            });
        });
        let message = users.deletedCount==1?"delete success fully":"failed to delete";
        res.status(200).json({
            status: 200,
            Response: message
        });
    },
    updateUsersById: async (req, res) => {
        let {
            fist_name,
            last_name,
            sexe
        }=req.body;
        let users = await Users.updateOne({
                _id: req.params.user_id
            }, {
                fist_name,
                last_name,
                sexe
            }).then().catch(er => {
            return res.status(200).json({
                status: 500,
                message: "error server"
            });
        });
        let message = users.nModified==1?"modified success fully":"failed to modified";
        res.status(200).json({
            status: 200,
            Response: message
        });
    },
};

module.exports=userController;