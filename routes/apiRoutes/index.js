const router = require('express').Router();
const deptRoutes = require('./dept-routes');
const roleRoutes = require('./role-routes');
const employeeRoutes = require('./employee-routes');

router.use('/depts', deptRoutes);
router.use('/roles', roleRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;