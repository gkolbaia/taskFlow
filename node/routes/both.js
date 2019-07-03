const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const verify = require('../helpers/verify');
require('../models/staff');
StaffModel = mongoose.model('staff');
const getUserId = require('../helpers/getUserId');
const jwt = require('jsonwebtoken');
const upload = require('../helpers/imageUpload');

router.get('/getposter', (req, res) => {
    let token = req.query.auth;
    jwt.verify(token, 'SecretKey', (err, success) => {
        if (err) {
            res.status(401).send('Unauthorized Request')
        } else if (success) {
            fs.readFile('./' + req.query.path, (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.contentType('image/jpeg');
                    res.send(data);
                }

            })
        }
    })
});
router.get('/getuser', verify, (req, res) => {
    const id = getUserId(req, res);
    StaffModel.findById(id, (err, user) => {
        if (err) {
            res.status(500).send('Something Went Wrong')
        } else if (!user) {
            res.status(404).send('Cant Find That User');
        } else if (user) {
            res.status(200).send(user)
        }
    })
});
router.post('/editstaff', verify, (req, res) => {
    const id = getUserId(req, res);
    StaffModel.findById(id, req.body.key, (err, staff) => {
        if (err) {
            res.status(500).send('Something went wrong')
        } else if (!staff) {
            res.status(401).send('Unauthorized User')
        } else if (staff) {
            staff[req.body.key] = req.body.value;
            staff.save()
                .then(savedUser => res.status(200).send(savedUser));
        }
    })
});
router.post('/editimage', verify, (req, res) => {
    const id = getUserId(req, res)
    upload(req, res, (err) => {
        if (err) {
            res.status(500).send('something went wrong')
        } else {
            if (req.file === undefined) {
                res.status(400).send('undefined')
            } else {
                StaffModel.findById(id, (err, staff) => {
                    if (err) {
                        res.status(500).send('something went wrong')
                    } else if (!staff) {
                        res.status(401).send('unauthorized request')
                    } else if (staff) {
                        staff.imagePath = req.file.path;
                        staff.save()
                            .then(savedStaff => {
                                res.status(200).send({ imagePath: savedStaff.imagePath });
                            });
                    }
                })
            }
        }
    })
});
module.exports = router;