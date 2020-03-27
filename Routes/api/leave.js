const express = require('express');
const router = express.Router();

const Leave = require('../../Models/leavemodel');
const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add', auth, (req, res) => {
    const { startdate,enddate,reson,user } = req.body;


    if (!startdate || !enddate || !reson || !user) {
        return res.status(400).json("fill all fields!")
    };
    const newleave = new Leave(
        { startdate,enddate,reson,user }
    )
     User.findById(user).then((user) => {
        newleave.save()
        .then(leave => res.json({
            _id:leave._id,
            startdate:leave.startdate,
            enddate:leave.enddate,
            reson:leave.reson,
            user:user
        }))
        .catch(err => res.status(400).json(err));

    }).catch(err =>{ res.status(400).json(err)})
   })

router.delete('/:id', auth, (req, res) => {
    Leave.findByIdAndDelete(req.params.id)
        .then(leave => res.json(leave))
        .catch(err => res.status(400).json(err));
});

router.post('/:id', auth, (req, res) => {
    const { startdate,enddate,reson,user } = req.body;

    Leave.findByIdAndUpdate(req.params.id,req.body).populate("user","username").then(()=>
    Leave.findById(req.params.id).populate("user").then((leave)=>res.json(leave)).catch(err =>{ res.status(400).json(err)})

      )
        .catch(err => res.status(400).json(err));
});

router.get('/:id', auth, (req, res) => {

    Leave.findById(req.params.id).then(leave => res.json(leave))

        .catch(err => res.status(400).json(err));
});

router.get('/', auth, (req, res) => {

    Leave.find().select("-password").populate("user","username").then(leave =>{
       Leave.countDocuments({status:"Pending"}).then(count=>res.json({
           leave:leave,count:count
       }))
    })

        .catch(err => res.status(400).json(err));
})



module.exports = router;