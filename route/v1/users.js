const express = require("express");
const userController = require("../../controllers/userController");
const userValidation = require("../../middlewares/userValidation");
const validatetToken =require("../../middlewares/validateToken");
const router = express.Router();

router.get("/",validatetToken,userController.getUsers)
        .get("/:user_id/detail",validatetToken, userValidation.validateUserID, userController.getUsersById)
        .post("/login",userController.loginUsers)
        .post("/create",validatetToken,userValidation.createUser,userController.createUser)
        .delete("/:user_id/delete",validatetToken, userValidation.validateUserID, userController.deleteUsersById)
        .patch("/:user_id/update",validatetToken, userValidation.validateUserID, userValidation.updateUser, userController.updateUsersById)

module.exports = router;