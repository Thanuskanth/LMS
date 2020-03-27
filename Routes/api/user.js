const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../Models/UserModel');
const Role = require('../../Models/rolemodel');
const Leave = require('../../Models/leavemodel');
const auth = require('../../middleware/auth');

router.post('/add', (req, res) => {
    const { username, password, email, role } = req.body;
    if (!role || !username || !password || !email) {
        return res.status(400).json("fill all fields!")

    };

    const newuser = new User(
        { username, password, email, role }
    )

    bcrypt.genSalt(10, (err, salt) => {
        if (err) res.status(400).json("error");
        bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) res.status(400).json(err);
            newuser.password = hash;
            newuser.save().then(user => {
                jwt.sign(
                    { id: user.id },
                    process.env.jwt_secred,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) return res.status(400).json("token does not match");
                        Role.findById(user.role).then((role) => {

                            res.json({

                                token,
                                user: {
                                    username: user.username,
                                    email: user.email,
                                    role: role
                                }
                            })

                        }).catch(err => res.status(400).json(err))



                    }
                )
            })
        }
        )

    });
})

router.delete('/:id', auth, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

router.post('/:id', auth, (req, res) => {

    User.findByIdAndUpdate(req.params.id, req.body).then(() =>
        User.findById(req.params.id).populate("role").then((user) => res.json(user))
    )
});

router.get('/:id', (req, res) => {
    Leave.find({ "user": req.params.id }).then(leave => {
        User.findById(req.params.id).select("-password").populate("role").then(user => res.json({ user, leave }))

            .catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));




});

router.get('/', auth, (req, res) => {

    User.find().populate("role")
        .select("-password")
        .then(user => res.json(user))

        .catch(err => res.status(400).json(err));
})



router.post('/password/:id', auth, (req, res) => {
    const { oldpassword, newpassword, conformpassword } = req.body;
    if (!oldpassword || !newpassword || !conformpassword ) {
        return res.status(400).json("fill all fields!")

    };
    if (newpassword !== conformpassword) { return res.status(400).json("conform password does not match") }
    User.findById(req.params.id).then(user =>
        bcrypt.compare(oldpassword, user.password).then((ismatch) => {
            if (!ismatch) { return res.status(400).json("old password credencials does not match") }

            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newpassword, salt, (err, hash) => {
                    password = hash;
                    User.findByIdAndUpdate(req.params.id, { password }).then(() =>
                        User.findById(req.params.id).populate("role").then().catch(err =>{ res.status(400).json(err)})
                    ).catch(err =>{ res.status(400).json(err)})
                })
            )
        }


        ).catch(err => { res.status(400).json(err) })
    )

});
module.exports = router;