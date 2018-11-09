const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res) => {
    res.send(layout(''));
});
router.post('/', async (req, res, next) => {
    // res.send('Posting wiki');
    // res.json(req.body);
    const page = new Page({
        title: req.body.title,
        slug: req.body.title,
        content: req.body.pagecontent,
        // status (automatically set)
    });
    try {
        await page.save(); //returns promise
        res.redirect('/');
    } catch(err) {
        next(err);
    }
});
router.get('/add', (req, res) => {
    res.send(addPage());
});

module.exports = router;
