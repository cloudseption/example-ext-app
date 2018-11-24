// Requires
const dotenv                    = require("dotenv").config();
const path                      = require('path');
const log                       = require('log4js').getLogger();
const express                   = require('express');
const cookieParser              = require('cookie-parser');
const bodyParser                = require('body-parser');
const badgebookTokenHandler     = require('./security/badgebook-token-handler');

// Log Setup
log.level               = process.env.LOG_LEVEL || '';

// App Setup
const PORT              = process.env.PORT || 7777;
const app               = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(badgebookTokenHandler);

// Routes

app.get('/', (req, res, next) => { res.sendFile(`${__dirname}/public/index.html`) });
app.get('/am-i-logged-in', function(req, res, next) {
    let loggedIn = req.isValidBadgeBookUser;
    let response;

    if (loggedIn) {
        response = `Yes! Your user ID is ${req.badgeBookUserDetails.userId}`;
    }
    else {
        response = `Nope! Go log in.`
    }
    res.status(200).send(`[Timestamp: ${Date.now()}]: ${response}`);
});

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => { log.info(`Listening on port ${PORT}`) });