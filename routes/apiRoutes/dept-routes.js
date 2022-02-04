const router = require('express').Router();
const db = require('../../db/connection');
const cTable = require('console.table');

// view all depts
router.get('/', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        console.table(rows);
        res.json({
            message: 'you made it!',
            body: rows
        });
    })

});

// add new dept
router.post('/', ({ body }, res) => {
    const sql = `INSERT INTO department (_name) VALUES (?)`;
    const params = [body._name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        res.json({
            message: result,
            data: body
        });
    });
});

module.exports = router;