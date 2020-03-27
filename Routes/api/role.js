const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Role = require('../../Models/rolemodel');

router.post('/add', (req, res) => {
    const { role } = req.body;
    if (!role) {
        return res.status(400).json("fill all fields!")
    };
    const newrole = new Role(
        { role }
    )
    newrole.save()
        .then(role => res.json(role))
        .catch(err => res.status(400).json(err));
})

router.delete('/:id',auth, (req, res) => {
    Role.findByIdAndDelete(req.params.id)
        .then(role => res.json(role))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {

    Role.findByIdAndUpdate(req.params.id, { role: req.body.role },(null)).then(
        (role) => res.json(role))
        .catch(err => res.status(400).json(err));
});

router.get('/:id', auth,(req, res) => {

    Role.findById(req.params.id).then(role => res.json(role))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Role.find().then(role => res.json(role))

        .catch(err => res.status(400).json(err));
})



module.exports = router;