import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import handle from './lib/reactReduxTemplate';
import logger from './lib/logger';
import http from 'http';
import api from './apis/api';
import model from './models/index';

const app = express();
const port = process.env.PORT || 8080;
const index = http.Server(app);


handle().then((db, err) => {
    logger('db', err || 'Database successfully initialized');

    app.use(express.static(path.join(__dirname, '/../build')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    // app.use('/api', api(app, db));

    app.get('/user/USER_ID', (req, res) => {
        model.login((err, user) => {
            if (err) {
                res.status(500).send(err.message);
            } else if (user) {
                logger('db', err || user.username + ' successfully logged in');
                res.send({user});
            } else {
                logger('db', err || 'incorrect username or password');
                res.send({user});
            }
        });
    });

    app.post('/user/register', (req, res) => {
        model.registerUser(null, req.body, res);
        logger('db', err || 'POST successful: ', req.body);
    });

    app.post('/user/login', (req, res) => {
        model.login(null, req.body, res);
        logger('db', err || 'POST successful: ', req.body);
    });

    app.get('*', (req, res) => {
        console.log(`sendFile: ${path.join(__dirname, '/../build', 'index.html')}`);
        res.sendFile(path.join(__dirname, '/../build', 'index.html'));
    });

    index.listen(port, () => {
        console.log('listening on port ', port);
    });
});
