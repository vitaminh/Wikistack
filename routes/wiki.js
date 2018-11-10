const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const { Page } = require('../models');
const { addPage, wikiPage, main } = require('../views');

router.get('/', async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        res.send(main(pages));
    } catch (err) { next(err) }
});

router.post('/', async (req, res, next) => {
    // res.send('Posting wiki');
    // res.json(req.body);
    const page = new Page({
        title: req.body.title,
        content: req.body.pagecontent,
    });
    try {
        await page.save(); //returns promise
        res.redirect(`/wiki/${page.slug}`);
    } catch (err) {
        next(err);
    }
});

router.get('/add', (req, res) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        res.send(wikiPage(page));
    } catch (err) { next(err) }
});

module.exports = router;
