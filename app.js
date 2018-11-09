const morgan = require("morgan");
const express = require("express");
const htmlTemplateTag = require("html-template-tag");
const layout = require("./views/layout");
const { db } = require('./models');

const PORT = 1337;

const app = express();

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(layout(''));
    db.authenticate().
        then(() => {
            console.log('connected to the database');
        });
});
