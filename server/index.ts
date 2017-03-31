require('dotenv').config();

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as chalk from 'chalk';

import { closeDb } from './db';
import { authenticate } from './auth';
import { validateRequestBody, validateQueryParam } from './validators';
import { registerUser, loginUser, deleteUser } from './user';
import { getStatus, getAllRooms, getRoomLights, setRoomLights } from './lights';

const port = process.env.PORT || process.argv[2] || 8080;
const wrap = (fn: any) => (...args: any[]) => fn(...args).catch(args[2]);

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

apiRouter.get('/hue/status', wrap(authenticate), wrap(getStatus));

apiRouter.get('/rooms', wrap(authenticate), wrap(getAllRooms));
apiRouter.get('/rooms/:id', wrap(authenticate), wrap(getRoomLights));
apiRouter.post('/rooms/:id', wrap(authenticate), wrap(setRoomLights));

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Server running on port ${chalk.green(port)}`));

process.on('exit', () => {
    closeDb(process.env.DB_URL);
});
