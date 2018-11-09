const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const addPage = require('../views/addPage');

router.get('/', (req, res) => {
    res.send(layout(''));
});
router.post('/', (req, res) => {
    res.send('Posting wiki');
});
router.get('/add', (req, res) => {
    res.send(addPage());
});

module.exports = router;
