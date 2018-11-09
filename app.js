const morgan = require("morgan");
const express = require("express");
const htmlTemplateTag = require("html-template-tag");
const layout = require("./views/layout");
const wiki = require("./routes/wiki");
const user = require("./routes/user");
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
    await db.sync({ force: true }); //overwrites??
})();

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
    extended: false
}));
app.use('/wiki', wiki);

app.get('/', (req, res) => {
    res.send(layout(''));
    db.authenticate().
    then(() => {
        console.log('connected to the database');
    });
});
