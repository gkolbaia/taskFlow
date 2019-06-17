const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const localStorage = require('localStorage')

require('../models/staff');
const StaffModel = mongoose.model('staff');
const verify = require('../helpers/verify')
const getId = require('../helpers/getUserId')

router.post('/register', (req, res) => {
    StaffModel.findOne({ userName: req.body.userName }, (err, user) => {
        if (err) {
            console.log(err);
        } else if (user) {
            res.status(400).send('This User Name Already Exists')
        } else if (!user) {
            StaffModel.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    console.log(err);
                } else if (user) {
                    res.status(400).send('This Email Already Exists')
                } else if (!user) {
                    bcrypt.hash(req.body.password, 6, (err, hash) => {
                        if (err) {
                            res.status(500).send('Something Went Wrong');
                        } else {
                            req.body.password = hash;
                            new StaffModel(req.body)
                                .save()
                                .then(savedUser => {
                                    let payload = { userId: savedUser._id };
                                    let token = jwt.sign(payload, 'SecretKey', { expiresIn: '1h' });
                                    localStorage.setItem('token', token)
                                    res.status(200).send({ token: token, user: savedUser })
                                });
                        }
                    })

                }
            })
        }
    });
});
router.post('/login', (req, res) => {
    StaffModel.findOne({ userName: req.body.userName }, (err, user) => {
        if (err) {
            res.status(500).send('Something Went Wrong, Try later');
        } else if (!user) {
            res.status(404).send('Invalid Username');
        } else if (user) {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if (err) {
                    res.status(500).send('Something Went Wrond,Try Later')
                } else if (!success) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { userId: user._id };
                    let token = jwt.sign(payload, 'SecretKey', { expiresIn: '1h' })
                    localStorage.setItem('token', token)
                    res.status(200).send({ token: token, user: user });

                }
            })
        }
    });
});
router.get('/permission', verify, (req, res) => {
    const id = getId(req, res);
    StaffModel.findById(id, (err, staff) => {
        if (err) {
            res.status(500).send('Somethin went wrong')
        } else if (!staff) {
            res.status(401).send('Unauthorized request')
        } else if (staff) {
            res.status(200).send({ permission: true, role: staff['role'] });
        }
    })

});
router.get('/logout', (req, res) => {
    localStorage.removeItem('token');
    res.status(200).send(localStorage.getItem('token'))
});
module.exports = router