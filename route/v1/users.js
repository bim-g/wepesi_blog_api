const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router.get("/",userController.getUsers)
        .get("/:user_id/detail",userController.getUsersById)
        .post("/login",userController.loginUsers)
        .post("/create",userController.createUser)
        .delete("/:user_id/delete", userController.deleteUsersById)
        .patch("/:user_id/update", userController.updateUsersById)

module.exports = router;