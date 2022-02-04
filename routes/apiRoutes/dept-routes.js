const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'you made it!' });
});

module.exports = router;