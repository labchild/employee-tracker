const connection = require('../db/connection');


class DB {
    // references connection for later queires
    constructor(connection){
        this.connection = connection;
    };

    // methods on db instance (promises)
    // view all departments
    viewAllDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM department'
        ).then(([rows, ...stuff]) => rows);
    };

    // view all roles
    viewAllRoles() {
        return this.connection.promise().query(
            'SELECT * FROM role'
        ).then(([rows, ...stuff]) => rows);
    };

    // view all employess
    viewAllEmployees() {
        return this.connection.promise().query(
            'SELECT * FROM employee'
        ).then(([rows, ...data]) => rows);
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
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
        const params = [answer.title, answer.salary, answer.department_id];
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