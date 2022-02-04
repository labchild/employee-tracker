const router = require('express').Router();
const deptRoutes = require('./dept-routes');

router.use('/dept', deptRoutes);

module.exports = router;