const express = require('express');
const router = express.Router();
const db = require('../utils/database');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
    res.render('login');
})

router.post('/', async function(req, res) {
    const user = await db('key').where('privatekey', req.body.privatekey);
    if (user == null){
        return res.json({
            authenticated: false
        });
    }

    const payload = {
        userid: user[0].id
    }

    const opts = {
        expiresIn: 60000
    }

    const accessToken = jwt.sign(payload, 'Ae5jFLQ2BF', opts);
    console.log(accessToken);
    return res.json({
        authenticated: true,
        accessToken: accessToken
    });
})

module.exports = router;