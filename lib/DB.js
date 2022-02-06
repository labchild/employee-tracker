const connection = require('../db/connection');


class DB {
    // references connection for later queires
    constructor(connection){
        this.connection = connection;
    };

    // methods on db instance (promises)
    // view all departments
    getAllDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM department'
        ).then(([rows, ...data]) => rows);
    };

    // view all roles
    getAllRoles() {
        const sql = 'SELECT * FROM role LEFT JOIN department ON role.dept_id = department.dept_id';
        return this.connection.promise().query(sql)
            .then(([rows, ...data]) => rows);
    };

    // view all employess
    getAllEmployees() {
        const sql = `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department._name as dept,
        (SELECT CONCAT(x.first_name, ' ', x.last_name) FROM employee x WHERE x.employee_id = employee.manager_id) AS manager
        FROM employee
        LEFT OUTER JOIN role ON employee.role_id = role.role_id
        LEFT OUTER JOIN department ON role.dept_id = department.dept_id
        ORDER BY last_name`;
        return this.connection.promise().query(sql)
            .then(([rows, ...data]) => rows);
    };

    // add new dept
    addDepartment(answer) {
        return this.connection.promise().query(
            'INSERT INTO department (_name) VALUES (?)',
            [answer._name]
        ).then(([result, ...data]) => result.affectedRows);
    };

    // add new role
    addRole(answer) {
        const sql = 'INSERT INTO role (title, salary, dept_id) VALUES (?,?,?)';
        const params = [answer.title, answer.salary, answer.dept_id];
        return this.connection.promise().query(sql, params);
    };

    // add new employee
    addEmployee(answer) {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
        const params = [
            answer.first_name,
            answer.last_name,
            answer.role_id,
            answer.manager_id
        ];
        return this.connection.promise().query(sql, params);
    };

    // update employee role
    changeEmployeeRole(newRole, employeeId){
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [newRole, employeeId];
        return this.connection.promise().query(sql, params);
    };
};

module.exports = new DB(connection);