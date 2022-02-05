const router = require('express').Router();
const cTable = require('console.table');
const db = require('../../db/connection');

// view all employees
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM employee';

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        console.table(rows)
        res.json(rows);
    })
});

// add a new employee
router.post('/', ({ body }, res) => {
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
        body.department_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        console.log('Employee added to database.')
        res.json({
            message: result,
            data: body
        });
    });
});

// update an employee's role
router.put('/:id', (req, res) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        } else if (!result.affectedRows) {
            res.status(404).json({ message: 'Employee record not found' });
        } else {
            console.log('Employee role updated.');
            res.json({
                message: result,
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

module.exports = router;