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
        )
    };

    // view all roles
    viewAllRoles() {
        return this.connection.promise().query(
            'SELECT * FROM role'
        )
    };

    // view all employess
    viewAllEmployees() {
        return this.connection.promise().query(
            'SELECT * FROM employee'
        )
    };

    // add new dept
    addDepartment(answer) {
        return this.connection.promise().query(
            'INSERT INTO department (_name) VALUES (?)',
            [answer._name]
        )
    }
}