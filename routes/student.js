const express = require('express');
const student = require("../api/student");
const admin = require("../api/admin");
const users = require("../api/users");
const router = express.Router();

router.get('/home/:id',admin.getNews,student.getQuestion,student.getMe, function(req, res, next) {
    res.render('student/studentView',{news:req.news, questions:req.questions,me:req.me});
});
router.get('/view-all',admin.getNews,student.getAllQuestions,student.getMe, function(req, res, next) {
    res.render('student/studentAllQuestions',{news:req.news, questions:req.questions,me:req.me});
});
router.get('/requests',student.getQuestionsNotAnswered,student.getMe,function(req, res, next) {
    res.render('student/request',{questions:req.questions,me:req.me});
});
router.post('/requests',student.askQuestion,function(req, res, next) {

});
router.get('/more/:id',student.getQuestionById,student.getAnswers,student.getImage,student.getMe,function(req, res, next) {
    res.render('student/studentRequestMore',{questions:req.questions,answers:req.answers,image:req.image,me:req.me});
});
router.get('/news-more/:id',admin.getNewsById,student.getMe,function(req, res, next) {
    res.render('student/studentNews',{news:req.news,me:req.me});
});
router.get(`/myProfile/:id`,student.getMe,student.getProfileImage,function(req, res, next) {
    res.render('student/profile',{me: req.me, image: req.image});
});
router.get('/form/:id',student.getQuestionById,student.getMe,function(req, res, next) {
    res.render('student/form',{questions:req.questions,me:req.me});
});
router.post('/form/:id',student.getQuestionById,student.answers,student.isAnswered,student.ddImageAnswers,function(req, res, next) {
});
router.get('/edit-profile/:id',student.getMe,function(req, res, next) {
    res.render('student/editProfile',{me:req.me});
});
router.post('/edit-profile/:id',student.editProfile,function(req, res, next) {
});

router.get('/like/:id' , student.likeQuestion,function(req, res, next) {

});
router.post('/like/:id' , student.likeQuestion,function(req, res, next) {
});
router.get('/sort-by-likes',admin.getNews,student.sortByLikes,student.getMe, function(req, res, next) {
    res.render('student/sort',{news:req.news, question:req.question,me:req.me});
});
router.get('./',function(req, res, next) {
    res.render('login');
});
module.exports = router;