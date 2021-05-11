const express = require('express');
const app = express();
const Blockchain = require('./models/blockchain'); 
const morgan = require('morgan')
require('express-async-errors');
const sha256 = require('sha256');
const rp = require('request-promise');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.json());
app.use(morgan('dev'));

app.set('views', './views');
app.set('view engine', 'hbs');

const backup = new Blockchain();

//const master = backup.createNewTransaction(1000000, "system-reward", 'c503cc00d91539eaa146f656120311f64953394874d3466399a2e46c3382c4ea');

//backup.chain[0].transactions.push(master);

const port = 3000;

var server = app.listen(port, function () {
    console.log('listening to port: ' + port);
});

app.use('/create', require('./routes/create.route'));
app.use('/login', require('./routes/login.route'));
app.use('/home', require('./routes/home.route'));
app.use('/send', require('./routes/send.route'));
app.use('/mining', require('./routes/mining.route'));
app.use('/block', require('./routes/block.route'));

const db = require('./utils/database'); 
const dbmodel = require('./models/db.model')

dbmodel.getall().then( data => {
    
    for (b of data) {
        const block = {
            index: b.index,
            timestamp: b.timestamp,
            transactions: [],
            nonce: b.nonce,
            hash: b.hash,
            previousBlockHash: b.previousBlockHash
        }
        for (t of b.transactions) {
            block.transactions.push(t)
        }
        console.log(block);
        backup.chain.push(block);
    }
})



const auth = require('./middlewares/auth.mdw');

app.get('/user/getamount', auth, async function(req, res) {
    const userid = req.accessTokenPayload.userid;
    const user = (await db('key').where('id', userid))[0];
    const data = backup.getAddressData(user.publickey);
    data.authenticated = true;
    data.publickey = user.publickey;
    res.json(data);
})

app.post('/transaction/broadcast', auth, async function(req, res) {
    const userid = req.accessTokenPayload.userid;
    const user = (await db('key').where('id', userid))[0];
    const data1 = backup.getAddressData(user.publickey);
    
    const amount = parseFloat(req.body.amount);
    const newTransaction = backup.createNewTransaction(amount, req.body.sender, req.body.recipient);

    const sender = req.body.sender;

    if (sender !== "system-reward") {
        const valid = sha256(req.body.pvkey) === req.body.sender;
        if (!valid) {
            res.json({
                note: false
            });
        }

        const data2 = backup.getAddressData(req.body.recipient);
        if (data1.addressBalance < amount || data2 === false || data2 === false) {
            res.json({
                note: false
            });
        }
        if (req.body.amount.length === 0 || amount === 0 || amount < 0 || req.body.sender.length === 0 || req.body.recipient.length === 0) {
            res.json({
                note: false
            });
        }
    }

    if (amount > 0) {
        backup.addTransactionToPendingTransactions(newTransaction);

        res.json({
            note: true
        });
    }
});

app.post('/receive-new-block', function(req, res) {
    const newBlock = req.body.newBlock;
    const lastBlock = backup.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    
    const correctIndex = lastBlock.index + 1 === newBlock.index;

    if (correctHash && correctIndex) {
        dbmodel.addToData(newBlock);
        backup.chain.push(newBlock);
        res.json({
            newBlock: true
        });
    }
    else {
        backup.pendingTransactions = newBlock.transactions;
        res.json({
            newBlock: false
        });
    }
});

app.get('/mine', auth, async function(req, res) {
    const userid = req.accessTokenPayload.userid;
    const user = (await db('key').where('id', userid))[0];
    const lastBlock = backup.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    if (backup.pendingTransactions.length === 0) {
        return res.json({
            mine: false,
            block: null
        });
    }
    const currentBlockData = {
        transactions: backup.pendingTransactions,
        index: lastBlock['index'] + 1
    }

    const nonce = backup.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = backup.hashBlock(previousBlockHash, currentBlockData, nonce);
    const newBlock = backup.createNewBlock(nonce, previousBlockHash, blockHash);
    const requestOptions = {
        uri: 'http://localhost:3000/receive-new-block',
        method: 'POST',
        body: { newBlock: newBlock },
        json: true
    };
    rp(requestOptions)
        .then(data => {
            if (!data.newBlock) {
                return res.json({
                    mine: false,
                    block: null
                });
            }
            else {
                const requestOp = {
                    uri: 'http://localhost:3000/transaction/broadcast',
                    method: 'POST',
                    headers:{ "x-access-token": req.accessToken},
                    body: {
                        amount: 10,
                        sender: "system-reward",
                        recipient: user.publickey
                    },
                    json: true
                };
                rp(requestOp).then(data => {
                    res.json({
                        mine: true,
                        block: newBlock
                    });
                });
            }
        })
});

app.get('/chain', auth, function(req, res) {
    const data = {
        chain: backup.chain,
        authenticated: true
    }
    res.json(data);
});

app.get('/err', function(req, res) {
    throw new Error('Error');
})

app.use(function (req, res, next) {
    res.status(404).json({
        error_message: 'Endpoint not found'
    });
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({
        error_message: 'Something broke!'
    });
})
