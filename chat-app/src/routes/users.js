const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('./database');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('select * from dbo.tblUser');

        res.json(result.recordset);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

module.exports = router;
