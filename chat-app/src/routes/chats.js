const express = require('express');
const router = express.Router();
const { poolPromise } = require('./database');
const sql = require('mssql');

// Get chat history between two users
router.get('/:currentUser/:selectedUser', async (req, res) => {
    try {
        const { currentUser, selectedUser } = req.params;
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('currentUser', sql.Int, Number(currentUser))
            .input('selectedUser', sql.Int, Number(selectedUser))
            .query("SELECT * FROM tblChat WHERE (SenderUserId = @currentUser AND ReceiverUserId = @selectedUser) OR (SenderUserId = @selectedUser AND ReceiverUserId = @currentUser) ORDER BY TimeStamp ASC");
        res.json(result.recordset);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const { sender, recipient, text } = req.body;
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('sender', sql.Int, Number(sender))
            .input('recipient', sql.Int, Number(recipient))        
            .input('text', sql.VarChar, text)
            .query("INSERT INTO tblChat (SenderUserId, ReceiverUserId, Message, TimeStamp) VALUES (@sender, @recipient, @text, GETDATE())");
        res.json(result.recordset);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
