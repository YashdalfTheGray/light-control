require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const { closeDb } = require('./db');
const { authenticate } = require('./auth');
const { validateRequestBody, validateQueryParam } = require('./validators');
const { registerUser, loginUser, deleteUser } = require('./user');
const { getStatus, getAllLights, getRoomLights } = require('./lights');

const port = process.env.PORT || process.argv[2] || 8080;
const wrap = fn => (...args) => fn(...args).catch(args[2]);

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        status: 'okay'
    });
});

apiRouter.post('/users/register', validateRequestBody('name'), wrap(registerUser));
apiRouter.get('/users/login', validateQueryParam('name'), wrap(loginUser));
apiRouter.delete('/users/:name', validateRequestBody('name'), wrap(authenticate), wrap(deleteUser));

apiRouter.get('/lights/status', wrap(authenticate), wrap(getStatus));
apiRouter.get('/lights', wrap(authenticate), wrap(getAllLights));
apiRouter.get('/lights/:id', wrap(authenticate), wrap(getRoomLights));

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Server running on port ${chalk.green(port)}`));

process.on('exit', () => {
    closeDb(process.env.DB_URL);
});
