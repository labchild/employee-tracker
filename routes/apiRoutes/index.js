const router = require('express').Router();
const deptRoutes = require('./dept-routes');
const roleRoutes = require('./role-routes');

router.use('/depts', deptRoutes);
router.use('/roles', roleRoutes);

module.exports = router;