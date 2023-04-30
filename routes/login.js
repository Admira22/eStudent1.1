const express = require('express');
const users = require("../api/users");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});
router.post('/',users.getUser,function (req,res,next) {
    if (req.user) {
        res.cookie('user', req.user);
        switch(req.user.user_type) {
            case 'admin':
                res.redirect(`/admin/home/${req.user.id}`);
                break;
            default:
                res.redirect(`/student/home/${req.user.id}`);
                break;
        }
    }
    else res.send({message: req.message});
})
module.exports = router;