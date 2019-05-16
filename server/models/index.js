import mongoose from 'mongoose';
import Media from '../schemas/media';
import User from '../schemas/user';

mongoose.connect('mongodb://localhost:27017/watch-with-me');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('We\'re connected.'));

const getAll = (cb) => {
    Media.find()
        .limit(25)
        .exec(cb);
};

const addMedia = (err, data) => {
    if (err) return console.log(err);
    const { user, watchlist } = data;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> user = ', user);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> watchlist = ', watchlist);
    // add media to user's watchlist
    User.updateOne(
        { username: user.username },
        {
            watchlist: watchlist,
        },
        null,
        () => {
            // update audience
            console.log('>> Must Update Audience <<');
        }
    );
    console.log('media saved to db');
};

const deleteMedia = (err, data) => {
    if (err) return console.log(err);
    const { user, watchlist } = data;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> user = ', user);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> watchlist = ', watchlist);
    // add media to user's watchlist
    User.updateOne(
        { username: user.username },
        {
            watchlist: watchlist,
        },
        null,
        () => {
            // update audience
            console.log('>> Must Update Audience <<');
        }
    );
    console.log('media saved to db');
};

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
                watchlist: [],
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
    }, (err, dup) => {
        if (err) {
            return console.error(err);
        } else if (!dup) {
            return console.log('Incorrect username or password');
        } else {
            const newUser = new User({
                username: data.username,
                password: data.password,
                date_created: new Date(),
                preferences: {},
                friends: [],
                watchlist: [],
            });
            newUser.save()
                .then((user) => {
                    console.log(user.username, ' registered.');
                    res.send(user);
                });
        }
    });
};

module.exports.getAll = getAll;
module.exports.addMedia = addMedia;
module.exports.deleteMedia = deleteMedia;
module.exports.registerUser = registerUser;
module.exports.login = login;
