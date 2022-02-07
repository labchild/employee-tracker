INSERT INTO department (_name)
VALUES 
('Engineering'), 
('Design'), 
('Sales'), 
('Accounting');

INSERT INTO role (title, salary, dept_id)
VALUES
('Manager', 100000, NULL),
('Engineer', 80000, 1),
('Designer', 60000, 2),
('Sales Person', 45000, 3),
('Accountant', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Natalie', 'Goodman', 1, NULL),
('Linzi', 'Oakley', 2, 1),
('Tasnia', 'Chadwick', 3, 1),
('Bianca', 'Goddard', 3, 1),
('Elias', 'Griffin', 4, 1),
('Cian', 'Bullock', 5, 1),
('Louisa', 'Kaur', 1, NULL),
('Yazmin', 'Cassidy', 2, 7),
('Anna-Marie', 'Andersen', 2, 7),
('Ezekial', 'Sampson', 4, 7),
('Tanvir', 'Churchill', 5, 7);