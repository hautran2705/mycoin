const express = require('express');
const router = express.Router();
const db = require('../utils/database');
const jwt = require('jsonwebtoken');


router.get('/', function(req, res) {
    res.render('send');
})

module.exports = router;