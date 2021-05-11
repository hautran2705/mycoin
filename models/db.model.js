const db = require('../utils/database');

module.exports = {
    async getall() {
        const block = await db('block');
        return block;
    },

    async addToData(block) {
        const ins = {
            index: block.index,
            timestamp: block.timestamp,
            transactions: JSON.stringify(block.transactions),
            nonce: block.nonce,
            hash: block.hash,
            previousBlockHash: block.previousBlockHash
        }
        await db('block').insert(ins);
    } 
};
