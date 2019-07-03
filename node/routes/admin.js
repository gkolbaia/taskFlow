const express = require('express');
const router = express.Router();
const verifyAdmin = require('../helpers/verifyAdmin')
const verify = require('../helpers/verify')

router.use('', verify)
router.use('', verifyAdmin)
router.get('/testi', (req, res) => {
    res.status(200).send({ message: 'Gj' });
})

module.exports = router;