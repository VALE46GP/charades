import mongoose from 'mongoose';
import User from '../schemas/user';

mongoose.connect('mongodb://localhost:27017/charades');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('We\'re connected.'));

/**
 * Register user and password
 *
 * @param {string} err
 * @param {object} data: {username: {String}, password {String}}
 * @returns {function} callback
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

module.exports.registerUser = registerUser;
module.exports.login = login;
