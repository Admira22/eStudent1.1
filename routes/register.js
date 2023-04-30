const express = require('express');
const users = require("../api/users");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register');
});
router.get('/new-user',function(req, res, next) {
    res.render('register');
});
router.post('/new-user',users.createUser,function (req,res,next) {
});
module.exports = router;