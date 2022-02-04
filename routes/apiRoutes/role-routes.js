const router = require('express').Router();
const cTable = require('console.table');
const db = require('../../db/connection');

// view all roles
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM role';

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        console.table(rows);
        return res.json(rows);
    })
});

// add new role
router.post('/', ({ body }, res) => {
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
    const params = [body.title, body.salary, body.department_id];

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