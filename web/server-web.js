const express = require('express');
const exphbs = require('express-handlebars');
const {listUsers} = require('../src/users');
const {listChannels} = require('../src/channels');
const {traits} = require('../src/gb-status');
const {allCommands} = require('../src/commands');

const viewsPath = __dirname + '/public/views/';
const app = express();
app.set('views', viewsPath);
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: viewsPath + 'layouts/',
    partialsDir: viewsPath + 'partials/'
}));
app.set('view engine', '.hbs');


/** Routes */
app.get('/', (req, res) => {

    if (req.body.challenge !== undefined)
    {
        res.send(req.body.challenge);    
    }
    else
    {
        res.render('home', {
            users: listUsers(),
            channels: listChannels(),
            traits,
            allCommands
        })
        ;
    }
});

/** Static Files */
app.use('/', express.static(__dirname + '/public'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log('listening on port: %s', port); // eslint-disable-line no-console
});

module.exports = server;
