const mongoose = require('mongoose');
const verify = require('./verify');
const getUserId = require('./getUserId');
require('../models/staff');
const StaffModel = mongoose.model('staff');

module.exports = function (req, res, next) {
    const id = getUserId(req, res);
    StaffModel.findById(id, 'role', (err, staff) => {
        if (err) {
            return res.status(500).send('something went wrong')
        } else if (!staff) {
            return res.status(401).send('Unauthorized request')
        } else if (staff) {
            if (staff.role !== 'manager') {
                return res.status(401).send('Unauthorized Request')
            } else if (staff.role === 'manager') {
                next();
            }
        }
    });
}