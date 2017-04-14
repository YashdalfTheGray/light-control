require('dotenv').config();

const { resolve } = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const { closeDb } = require('./db');
const { authenticate } = require('./auth');
const { validateRequestBody, validateQueryParam } = require('./validators');
const { registerUser, loginUser, deleteUser } = require('./user');
const { getStatus, getAllRooms, getRoomLights, setRoomLights, getOneLight, setOneLight } = require('./hue');

const port = process.env.PORT || process.argv[2] || 8080;
const wrap = fn => (...args) => fn(...args).catch(args[2]);

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(resolve('public')));

apiRouter.get('/', (req, res) => {
    res.json({
        status: 'okay'
    });
});

apiRouter.post('/users/register', validateRequestBody('name'), wrap(registerUser));
apiRouter.get('/users/login', validateQueryParam('name'), wrap(loginUser));
apiRouter.delete('/users/:name', validateRequestBody('name'), wrap(authenticate), wrap(deleteUser));

apiRouter.get('/hue/status', wrap(authenticate), wrap(getStatus));

apiRouter.get('/rooms', wrap(authenticate), wrap(getAllRooms));
apiRouter.get('/rooms/:id', wrap(authenticate), wrap(getRoomLights));
apiRouter.post('/rooms/:id', wrap(authenticate), wrap(setRoomLights));

apiRouter.get('/lights/:id', wrap(authenticate), wrap(getOneLight));
apiRouter.post('/lights/:id', wrap(authenticate), wrap(setOneLight));

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Server running on port ${chalk.green(port)}`));

process.on('exit', () => {
    closeDb(process.env.DB_URL);
});
