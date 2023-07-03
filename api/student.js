const pool = require("../database/database");
const upload = require("../util/cloudinary");
const util = require("../util/util_functions");
const multer = require("multer");

const uploadFile = multer({ dest: 'uploads/' });

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
        let result = await upload(util.dataUri(req.files.cover.name,req.files.cover.data))
        let query = `INSERT INTO answersimages (answers_id, image_name, image_url, image_number) VALUES ($1, $2, $3, 1)`
        const params = [req.params.id, req.files.cover.name, result.secure_url]

        pool.query(query, params, (err, result) => {
            if (err) console.log(err)
            else
                next()
        })
    },

    ddImageAnswers: async (req, res, next) => {
        const uploadPromises = req.files.cover.map((file, index) => {
            return new Promise((resolve, reject) => {
                upload(util.dataUri(file.name, file.data))
                    .then(result => {
                        const query = `INSERT INTO answersimages (answers_id, image_name, image_url, image_number) VALUES ($1, $2, $3, $4)`;
                        const params = [req.params.id, file.name, result.secure_url, index + 1];

                        pool.query(query, params, (err, result) => {
                            if (err) reject(err);
                            else resolve(result.secure_url);
                        });
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        });

        try {
            await Promise.all(uploadPromises);
            res.locals.image = imageUrls;
            next();
        } catch (error) {
            console.log(error);
            // Handle the error appropriately
        }
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
    getImage: function (req, res, next) {
        console.log('HEJ')
        console.log(req.params.id)
        console.log("o hej")
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM answersimages WHERE answers_id= $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err) {
                        return res.send(err);
                    }
                    req.image = result.rows
                    next();
                })
        })

    },
    getProfileImage: function (req, res, next) {
        console.log('HEJ')
        console.log(req.params.id)
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM studentimages WHERE user_id= $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err) {
                        return res.send(err);
                    }
                    req.image = result.rows[0];
                    next();
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
                        console.log('o hej hello')
                        res.redirect(`/student/myProfile/${req.params.id}`);
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
                    console.log('sta je ovo')
                    req.questions = result.rows;
                    next();
                }
            })
        })
    }
}
module.exports = student;