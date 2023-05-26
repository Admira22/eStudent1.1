const express = require('express');
const student = require("../api/student");
const admin = require("../api/admin");
const users = require("../api/users");
const router = express.Router();

router.get('/home/:id',admin.getNews,student.getQuestion,student.getMe, function(req, res, next) {
    res.render('studentView',{news:req.news, questions:req.questions,me:req.me});
});
router.get('/view-all',admin.getNews,student.getAllQuestions,student.getMe, function(req, res, next) {
    res.render('studentAllQuestions',{news:req.news, questions:req.questions,me:req.me});
});
router.get('/requests',student.getQuestionsNotAnswered,student.getMe,function(req, res, next) {
    res.render('request',{questions:req.questions,me:req.me});
});
router.post('/requests',student.askQuestion,function(req, res, next) {

});
router.get('/more/:id',student.getQuestionById,student.getAnswers,student.getImage,student.getMe,function(req, res, next) {
    res.render('studentRequestMore',{questions:req.questions,answers:req.answers,image:req.image,me:req.me});
});
router.get('/news-more/:id',admin.getNewsById,student.getMe,function(req, res, next) {
    res.render('studentNews',{news:req.news,me:req.me});
});
router.get(`/myProfile/:id`,student.getMe,function(req, res, next) {
    res.render('profile',{me: req.me});
});
router.get('/form/:id',student.getQuestionById,student.getMe,function(req, res, next) {
    res.render('form',{questions:req.questions,me:req.me});
});
router.post('/form/:id',student.getQuestionById,student.answers,student.isAnswered,student.addImageAnswers,function(req, res, next) {
});
router.get('/edit-profile/:id',student.getMe,function(req, res, next) {
    res.render('editProfile',{me:req.me});
});
router.post('/edit-profile/:id',student.editProfile,users.addStudentImage,function(req, res, next) {
});
router.get('/log-out',function(req, res, next) {
    res.render('login');
});
module.exports = router;