const pool = require("../database/database");

admin = {
    //get functions (select)
    getAllStudents: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM users WHERE user_type = $1`, ['student'], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.users = result.rows;
                    next();
                }
            })
        })
    },
    getStudent: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM users WHERE user_type = $1 AND id = $2`, ['student',req.params.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.user = result.rows;
                    next();
                }
            })
        })
    },
    editStudent: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE users SET study_program  = $1
                          WHERE id = $2`, [req.body.program,req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else
                        res.redirect('/admin/users');


                })
        })
    },
    addNews: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`INSERT INTO news (title,subtitle,text)
                          VALUES($1,$2,$3)`, [req.body.title,req.body.subtitle,req.body.text], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.users = result.rows;
                    next();
                }
            })
        })

    },
    getNews: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM news ORDER BY id LIMIT 3;`, [], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.news = result.rows;
                    next();
                }
            })
        })

    },
    getNewsById: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            console.log(req.params.id)
            client.query(`SELECT * FROM news WHERE id = $1;`, [req.params.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.news = result.rows;
                    next();
                }
            })
        })

    },
    countStudents: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT COUNT(*) FROM users WHERE user_type = $1;`, ['student'], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                   // req.students = result.rows;
                    req.students = result.rows[0].count;
                    console.log('o hej')
                    console.log(result.rows[0].count)
                    next();
                }
            })
        })

    },

    getAllRequests: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM questions WHERE isHidden = false`, [], function (err, result) {
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
    getAllForbbidenRequests: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM questions WHERE isHidden = true`, [], function (err, result) {
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
    countQuestions:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT COUNT(*) FROM questions;`, function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.requests = result.rows[0].count;
                    next();
                }
            })
        })

    },
    countAnswers:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT COUNT(*) FROM answers;`, function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.answers = result.rows[0].count;
                    next();
                }
            })
        })

    },

    getForbiddenWords: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM forbidden_words;`, [], function (err, result) {
                done();

                if (err) {
                    return res.send(err);
                } else {
                    req.forbiddenWords = result.rows;
                    next();
                }
            })
        })


    },
    addWord: function (req,res,next){
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`INSERT INTO forbidden_words(word) VALUES($1)`, [req.body.word],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('/admin/words')
                        next();
                    }



                })
        })

    },
    deleteForbiddenWords: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`DELETE FROM forbidden_words WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('back')
                        next();
                    }


                })
        })
    },
    deleteQuestion: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`DELETE FROM questions WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('back')
                        next();
                    }


                })
        })

    },
}
module.exports = admin;