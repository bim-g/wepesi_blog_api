const joi =require("joi");
const Users = require("../models/Users");
// 
const userValidation={
    createUser:async (req,res,next)=>{
        const schema=joi.object({
            fist_name:joi.string().min(5).max(30).required(),
            last_name:joi.string().min(5).max(30).required(),
            sexe:joi.string().min(2).max(10).required(),
            username:joi.string().min(6).required(),
            password:joi.string().min(6).required(),
        });
        const {error} =schema.validate(req.body);

        if(error){
            return res.status(200).json({
                status:400,
                message:error.details[0].message
            });
        }
        let checkUser=await Users.findOne({username:req.body.username});
        if(checkUser){
            return res.status(200).json({
                status: 400,
                message: "this username already exist choose an other one"
            });
        }
        next();
    },
    updateUser:(req,res,next)=>{
        const schema=joi.object({
            fist_name:joi.string().min(5).max(30).required(),
            last_name:joi.string().min(5).max(30).required(),
            sexe:joi.string().min(2).max(10).required(),
        });
        const {error} =schema.validate(req.body);

        if(error){
            return res.status(200).json({
                status:400,
                message:error.detail[0].message
            });
        }
        next();
    },
    validateUserID:(req,res,next)=>{
        const schema=joi.object({
            user_id:joi.string().min(10).max(30).required()
        });
        const {error} =schema.validate(req.params);

        if(error){
            return res.status(200).json({
                status:400,
                message:error.detail[0].message
            });
        }
        next();
    },
};
module.exports=userValidation;