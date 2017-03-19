require('dotenv').config();
require('./init')('../admins.json');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const { closeDb } = require('./db');
const { registerUser, loginUser } = require('./user');

const port = process.env.PORT || process.argv[2] || 8080;
const wrap = fn => (...args) => fn(...args).catch(args[2]);

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        status: 'okay'
    });
});

app.post('/users/register', wrap(registerUser));
app.get('/users/login', wrap(loginUser));

app.listen(port, () => console.log(`Server running on port ${chalk.green(port)}`));

process.on('exit', () => {
    closeDb(process.env.DB_URL);
});
