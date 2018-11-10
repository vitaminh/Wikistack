const morgan = require("morgan");
const express = require("express");
const htmlTemplateTag = require("html-template-tag");
const wiki = require('./routes/wiki');
const user = require('./routes/user');
const {
    db,
    Page,
    User
} = require('./models');

const PORT = 1337;

const app = express();

const syncMe = (async () => {
    await Page.sync();
    await User.sync();
    await db.sync({ force: false }); // force option overwrites
})();

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
    extended: false
}));
app.use('/wiki', wiki);
app.use('/users', user);

app.get('/', (req, res) => {
    res.redirect('/wiki');
});
