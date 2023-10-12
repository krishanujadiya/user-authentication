var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/UserController");

router.get("/", user_controller.author_list);

module.exports = router;
