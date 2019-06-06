import mongoose from 'mongoose';
import User from '../schemas/user';
import Game from '../schemas/game';

mongoose.connect('mongodb://localhost:27017/charades');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('We\'re connected.'));

/**
 * Register user and password (if user does not already exist)
 *
 * @param {string} err
 * @param {object} data: {username: {String}, password {String}}
 * @param res
 */
const registerUser = (err, data, res) => {
    User.findOne({
        username: data.username
    }, (err, dup) => {
        if (err) {
            return console.error(err);
        } else if (dup) {
            return console.log(data.username, ' is already registered.');
        } else {
            const newUser = new User({
                username: data.username,
                password: data.password,
                date_created: new Date(),
                preferences: {},
                friends: [],
            });
            newUser.save()
                .then((user) => {
                    console.log(user.username, ' registered.');
                    res.send(user);
                });
        }
    });
};

/**
 * Login user with password (if there is a match)
 *
 * @param {string} err
 * @param {object} data: {username: {String}, password {String}}
 * @param res
 */
const login = (err, data, res) => {
    User.findOne({
        username: data.username,
        password: data.password,
    }, (err, user) => {
        if (err) {
            return console.error(err);
        } else if (!user) {
            return console.log('Incorrect username or password');
        } else {
            user.save()
                .then((user) => {
                    console.log(user.username, ' successfully logged in.');
                    res.send(user);
                });
        }
    });
};

/**
 * Register a new game
 *
 * @param {string} err
 * @param {object} data: {
 *     name: {string},
 *     created_by: String,
 * }
 * @param res
 */
const registerGame = (err, data, res) => {
    const newGame = new Game({
        name: data.name,
        start_date: new Date(),
        registered_players: [data.created_by],
        answers: [],
        turn: {},
    });
    newGame.save()
        .then((game) => {
            console.log('New game "' + game.name + '" created.');
            res.send(game);
        });
};

module.exports.registerUser = registerUser;
module.exports.login = login;
module.exports.registerGame = registerGame;
