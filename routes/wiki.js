const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const { Page, User } = require('../models');
const { addPage, wikiPage, main, editPage } = require('../views');

// display list of all articles
router.get('/', async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        res.send(main(pages));
    } catch (err) { next(err) }
});

// create a new post
router.post('/', async (req, res, next) => {
    try {
        const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        });

        const page = await Page.create(req.body);
        page.setAuthor(user);
        await page.save(); //returns promise
        res.redirect(`/wiki/${page.slug}`);
    } catch (err) {
        next(err);
    }
});

// navigate to the add page
router.get('/add', (req, res) => {
    res.send(addPage());
});

// get single page view of article
router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!page) {
            res.sendStatus(404);
        }
        const author = await page.getAuthor();
        res.send(wikiPage(page, author));
    } catch (err) { next(err) }
});

// delete article from database
router.get('/:slug/delete', async (req, res, next) => {
    try {
        const pagesDestroyed = await Page.destroy({
            where: {
                slug: req.params.slug
            }
        });
        if (pagesDestroyed === 0) {
            res.sendStatus(404);
        }
        res.redirect('/wiki');
    } catch (err) { next(err) }
});

// edit article
router.get('/:slug/edit', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!page) {
            res.sendStatus(404);
        }
        const author = await page.getAuthor();
        res.send(editPage(page, author));
    } catch (err) { next(err) }
});

// update edited article in the database
router.post('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });

        if (!page) {
            res.sendStatus(404);
        }
        page.content = req.body.content;
        page.status = req.body.status;
        await page.save(); //returns promise
        res.redirect(`/wiki/${page.slug}`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
