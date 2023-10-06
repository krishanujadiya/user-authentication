var express = require('express');
var router = express.Router();


const user_controller = require("../controllers/UserController");

router.get("/user", user_controller.author_list);
router.post("/register", user_controller.register);
router.post("/login", user_controller.login);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
