const express = require('express');
const admin = require("../api/admin");
const student = require("../api/student");
const router = express.Router();

router.get('/home/:id', admin.getNews,admin.countStudents,admin.countQuestions,admin.countAnswers,student.getQuestion,function(req, res, next) {
    res.render('adminView', {news: req.news, students: req.students,requests: req.requests,answers: req.answers,questions:req.questions});
});
router.get('/view-all',admin.getNews,student.getAllQuestions,student.getMe, function(req, res, next) {
    res.render('adminAllQuestions',{news:req.news, questions:req.questions,me:req.me});
});
router.get('/users',admin.getAllStudents,function(req, res, next) {
    res.render('users',{users: req.users});
});
router.get('/edit-user/:id',student.getMe,admin.getStudent,function(req, res, next) {
    res.render('editUser',{me:req.me,user:req.user});
});
router.post('/edit-user/:id',admin.editStudent,function(req, res, next) {
});
router.get('/more/:id',student.getQuestionById,student.getAnswers, function(req, res, next) {
    res.render('adminRequestMore', {questions:req.questions, answers:req.answers});
});
router.get('/news-more/:id',admin.getNewsById, function(req, res, next) {
    res.render('adminNews',{news:req.news});
});
router.get('/request', admin.getAllRequests,function(req, res, next) {
    res.render('adminRequest',{questions:req.questions});
});
router.get('/news', function(req, res, next) {
    res.render('news');
});
router.post('/news', admin.addNews,function(req, res, next) {
    res.render('news');
});
router.get('/log-out',function(req, res, next) {
    res.render('login');
});
module.exports = router;