const pool = require("../database/database");
const upload = require("../util/cloudinary");
const util = require("../util/util_functions");

student = {
    //get functions (select)
    getMe: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM users WHERE id = $1`, [req.cookies.user.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.me = result.rows;
                    next();
                }
            })
        })
    },
    askQuestion:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`INSERT INTO questions (question,subject)
                          VALUES($1,$2)`, [req.body.name,req.body.subject], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    res.redirect('back');
                    next();
                }
            })
        })

    },
    getQuestion:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM questions WHERE isanswered = true ORDER BY id  DESC LIMIT 5`, [], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.questions = result.rows;
                    next();
                }
            })
        })
    },
    getAllQuestions:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM questions WHERE isanswered = true`, [], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.questions = result.rows;
                    next();
                }
            })
        })
    },
    getQuestionById: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            console.log(req.params.id)
            client.query(`SELECT * FROM questions WHERE id = $1;`, [req.params.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.questions = result.rows;
                    next();
                }
            })
        })

    },
    answers:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`INSERT INTO answers (name,text,questions_id)
                          VALUES($1,$2,$3)`, [req.body.name,req.body.message,req.params.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else
                    next();
            })
        })

    },
    addImageAnswers: async (req, res, next) => {
        console.log(req.files.cover.name)
        let result = await upload(util.dataUri(req.files.cover.name, req.files.cover.data))
        let query = `INSERT INTO answersImage (answers_id, image_name, image_url, image_number) VALUES ($1, $2, $3, 1)`
        const params = [req.params.id, req.files.cover.name, result.secure_url]

        pool.query(query, params, (err, result) => {
            if (err) console.log(err)
            else
                next()
        })
    },
    isAnswered: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE questions SET isanswered = true WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else {
                        res.redirect('/student/home/:id');
                        next();
                    }

                })
        })
    },
    getAnswers: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM answers WHERE questions_id = $1`, [req.params.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.answers = result.rows;
                    next();
                }
            })
        })


    },
    editProfile: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE users SET name  = $1, lastname = $2, email = $3
                          WHERE id = $4`, [req.body.name,req.body.lastname,req.body.email,req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else {
                        res.redirect('/student/myProfile/:id');
                        next();
                    }
                })
        })

    },
    getQuestionsNotAnswered: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM questions WHERE isanswered = false`, [], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.questions = result.rows;
                    next();
                }
            })
        })
    }
}
module.exports = student;