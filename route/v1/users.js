const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router.get("/",userController.getUsers)
        .get("/:user_id/detail",userController.getUsersById)
        .post("/login",userController.loginUsers)
        .post("/create",userController.createUser)

module.exports = router;