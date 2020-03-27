const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../Models/UserModel');
const Role = require('../../Models/rolemodel');
const Leave = require('../../Models/leavemodel');

const auth = require('../../middleware/auth');

router.post('/login', (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json("fill all fields!")

    };

    User.findOne({ email }).then(user =>
        bcrypt.compare(password, user.password).then(ismathch => {
            if (!ismathch) { return res.status(400).json("credencials does not match") }
            jwt.sign(
                { id: user.id },
                process.env.jwt_secred,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) return res.status(400).json(err);
                    Leave.find({ "user": user.id }).then(leave => {

                        Role.findById(user.role).then((role) => {

                            res.json({
                                leave,
                                token,
                                user: {
                                    _id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    role: role
                                }
                            })

                        }).catch(err =>{ res.status(400).json(err)})
                    }).catch(err =>{ res.status(400).json(err)})



                }
            )

        })).catch(err =>{ res.status(400).json("Email does not exists")})




})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password').then(user => res.json(user)).catch(err =>{ res.status(400).json(err)})
})

router.get('/seed', (req, res) => {
    const role=["Admin"];
    role.map(role=>{
    const newrole=new Role({
            role
        })
        newrole.save().then((role)=>{

            bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash("admin", salt, (err, hash) => {
               

                const newuser=new User({
                    username:"Admin",
                    password:hash,
                    email:"admin@gmail.com",
                    role:role._id
                })
                
            })
        )
           
        });
    })
    User.findById(req.user.id).select('-password').then(user => res.json(user)).catch(err =>{ res.status(400).json(err)})
})

module.exports = router;