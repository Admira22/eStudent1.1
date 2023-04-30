const pool = require("../database/database");
const bcrypt = require("bcrypt");
const upload = require("../util/cloudinary");
const util = require("../util/util_functions");

users = {
    //functions for registration
    createUser: function (req, res, next) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.send(err);

            pool.connect(function (err, client, done) {
                if (err)
                    return res.send(err);

                client.query(`INSERT INTO users(user_type,name,lastname,email,password,study_program)
                          VALUES($1,$2,$3,$4,$5,$6)`, [req.body.type, req.body.name, req.body.lastname,
                                              req.body.email, hash, req.body.study_program],
                    function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else
                        res.redirect('/login');


                })
            })
        })
    },
    addStudentImage: async (req, res, next) => {
        console.log(req.files.cover.name)
        let result = await upload(util.dataUri(req.files.cover.name, req.files.cover.data))
        let query = `INSERT INTO studentImage (user_id, image_name, image_url, image_number) VALUES ($1, $2, $3, 1)`
        const params = [req.params.id, req.files.cover.name, result.secure_url]

        pool.query(query, params, (err, result) => {
            if (err) console.log(err)
            else
                next()
        })
    },
    //function for login
    getUser: function (req, res, next) {
        pool.query(`SELECT * FROM users WHERE email = $1`, [req.body.email], (err, result) => {

            if (err)
                console.log(err)

            if (result.rows.length > 0) {
                bcrypt.compare(req.body.password, result.rows[0].password, (err, response) => {
                    if (err) console.log(err)

                    if (response) {
                        const {password, ...rest} = result.rows[0]
                        req.user = rest

                    } else req.message = 'Wrong password'
                    next()
                })
            } else {
                req.message = 'User does not exist'
                next();
            }
        })
    },

}
module.exports = users;