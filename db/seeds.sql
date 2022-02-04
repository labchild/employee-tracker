INSERT INTO department (_name)
VALUES 
('Engineering'), 
('Design'), 
('Sales'), 
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 100000, NULL),
('Project Manager', 90000, 1),
('Engineer', 80000, 1),
('Art Director', 80000, 2),
('Designer', 60000, 2),
('Account Manager', 60000, 3),
('Sales Person', 45000, 3),
('Accountant', 60000, 4);

INSERT INTO employee (fist_name, last_name, role_id, manager_id)
VALUES
('Natalie', 'Goodman', 1, NULL),
('Linzi', 'Oakley', 2, 1),
('Tasnia', 'Chadwick', 3, 2),
('Bianca', 'Goddard', 3, 2),
('Elias', 'Griffin', 4, 1),
('Cian', 'Bullock', 5, 5),
('Louisa', 'Kaur', 1, NULL),
('Yazmin', 'Cassidy', 8, 7),
('Anna-Marie', 'Andersen', 6, 7),
('Ezekial', 'Sampson', 7, 9),
('Tanvir', 'Churchill', 7, 9)