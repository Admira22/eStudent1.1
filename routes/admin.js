const express = require('express');
const admin = require("../api/admin");
const student = require("../api/student");
const router = express.Router();

router.get('/home/:id', admin.getNews,admin.countStudents,admin.countQuestions,admin.countAnswers,student.getQuestion,function(req, res, next) {
    res.render('admin/adminView', {news: req.news, students: req.students,requests: req.requests,answers: req.answers,questions:req.questions});
});
router.get('/view-all',admin.getNews,student.getAllQuestions,student.getMe, function(req, res, next) {
    res.render('admin/adminAllQuestions',{news:req.news, questions:req.questions,me:req.me});
});
router.get('/users',admin.getAllStudents,function(req, res, next) {
    res.render('admin/users',{users: req.users});
});
router.get('/edit-user/:id',student.getMe,admin.getStudent,function(req, res, next) {
    res.render('admin/editUser',{me:req.me,user:req.user});
});
router.post('/edit-user/:id',admin.editStudent,function(req, res, next) {
});
router.get('/more/:id',student.getQuestionById,student.getAnswers,student.getImage,function(req, res, next) {
    res.render('admin/adminRequestMore', {questions:req.questions, answers:req.answers,image:req.image,});
});
router.get('/news-more/:id',admin.getNewsById, function(req, res, next) {
    res.render('admin/adminNews',{news:req.news});
});
router.get('/request', admin.getAllRequests,function(req, res, next) {
    res.render('admin/adminRequest',{questions:req.questions});
});
router.get('/news', function(req, res, next) {
    res.render('admin/news');
});
router.post('/news', admin.addNews,function(req, res, next) {
    res.render('news');
});
router.get('/new-word', function(req, res, next) {
    res.render('admin/newWord');
});
router.post('/new-word', admin.addWord,function(req, res, next) {
    res.render('admin/forrbidenWords');
});
router.get('/words', admin.getForbiddenWords,function(req, res, next) {
    res.render('admin/forrbidenWords',{forbiddenWords:req.forbiddenWords});
});

router.get('/delete-word/:id',admin.deleteForbiddenWords,function (req, res, next) {
});
router.get('/delete/:id',admin.deleteQuestion,function (req, res, next) {
});
router.get('./',function(req, res, next) {
    res.render('login');
});
module.exports = router;