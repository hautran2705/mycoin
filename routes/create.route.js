const express = require('express');
const router = express.Router();
const uuid = require('uuid').v1;
const sha256 = require('sha256');
const db = require('../utils/database');

router.get('/', function(req, res) {

    res.render('create');
})

router.post('/', async function(req, res) {
    const privatekey = uuid().split('-').join('');
    const key = {
        privatekey: privatekey,
        publickey: sha256(privatekey)
    }
    console.log(key);
    await db('key').insert(key);
    res.json(privatekey);
})

module.exports = router;