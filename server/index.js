require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const { closeDb } = require('./db');
const { authenticate } = require('./auth');
const { validateRequestBody, validateQueryParam } = require('./validators');
const { registerUser, loginUser, deleteUser } = require('./user');
const { getStatus, getAllLights } = require('./lights');

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

app.post('/users/register', validateRequestBody('name'), wrap(registerUser));
app.get('/users/login', validateQueryParam('name'), wrap(loginUser));
app.delete('/users/:name', validateRequestBody('name'), wrap(authenticate), wrap(deleteUser));

app.get('/lights/status', wrap(authenticate), wrap(getStatus));
app.get('/lights', wrap(authenticate), wrap(getAllLights));

app.listen(port, () => console.log(`Server running on port ${chalk.green(port)}`));

process.on('exit', () => {
    closeDb(process.env.DB_URL);
});
