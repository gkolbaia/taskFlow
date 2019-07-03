const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://192.168.4.169/gio-test-5-tasks', { useNewUrlParser: true })


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(express.static('./public'));
const generateNewToken = require('./helpers/generateNewToken');
const verifyAdmin = require('./helpers/verifyAdmin');
app.use('/', generateNewToken);
const auth = require('./routes/auth');
const shared = require('./routes/both')
const admin = require('./routes/admin');




app.use('/admin', admin);
app.use('/auth', auth);
app.use('/shared', shared);
const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});