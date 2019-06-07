import mongoose from 'mongoose';
import User from '../schemas/user';
import Game from '../schemas/game';
import Answer from '../schemas/answer';
import AnswerHistory from '../schemas/answerHistory';

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

// /**
//  * Register a new game
//  *
//  * @param {string} err
//  * @param {object} data: {
//  *     name: {string},
//  *     created_by: String,
//  * }
//  * @param res
//  */
// const registerGame = (err, data, res) => {
//     const newGame = new Game({
//         name: data.name,
//         start_date: new Date(),
//         registered_players: [data.created_by],
//         answers: [],
//         turn: {},
//     });
//     newGame.save()
//         .then((game) => {
//             console.log('New game "' + game.name + '" created.');
//             res.send(game);
//         });
// };

/**
 * Submit an answer to game
 *
 * @param {string} err
 * @param {object} answer: {
 *     answer: {string},
 *     name: {string},
 *     created_at: {date},
 * }
 * @param res
 */
const submitAnswer = (err, answer, res) => {
    const newAnswer = new Answer(answer);
    newAnswer.save()
        .then((answer) => {
            console.log('New answer "' + answer.answer + '" created by "' + answer.name);
            res.sendStatus(200);
        });
};

/**
 * Get a random answer from db that was not created by the username
 * Then, remove that answer from the answer table and insert it into the answer_history table
 *
 * @param {string} err
 * @param {string} username
 * @param res
 */
const getAnswer = (err, username, res) => {
    console.log('getAnswer is called by ', username);

    // Get the count of all answers
    Answer.count().exec((err, count) => {

        // Get a random entry
        const random = Math.floor(Math.random() * count);

        // Again query all users but only fetch one offset by our random #
        Answer.findOne().skip(random).exec(
            (err, answer) => {
                console.log('>>>>>>>>> answer = ', answer);
                console.log('getAnswer ID "' + answer._id + '" and was created by "' + answer.username + '"');

                // make sure the answer was not created by the username
                if (err) {
                    console.log(err);
                } else if (username === answer.username) {
                    console.log('>>>>> RECURSION!! <<<<<');
                    getAnswer(null, username, res);
                } else {
                    console.log('>>>>> ANSWER FOUND <<<<<>>>>>', answer);

                    // remove answer from answer table and insert into answer_history table
                    Answer.deleteOne({ _id: answer._id}, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const newAnswerHistory = new AnswerHistory({
                                answer: answer.answer,
                                username: answer.username,
                                created_at: answer.created_at,
                                last_used: new Date(),
                            });
                            newAnswerHistory.save()
                                .then((answer) => {
                                    console.log('Answer "' + answer.answer + '" added to history');
                                });
                        }
                    });
                    res.send(answer);
                }
            });
    });


    // Answer.aggregate([{ $sample: { size: 1 } }])
    //     .then((answer) => {
    //         console.log('>>>>>>>>> answer = ', answer);
    //         console.log('getAnswer ID "' + answer._id + '" and was created by "' + answer.username + '"');
    //         console.log('>>>>>>>>> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    //         if (err) {
    //             console.log(err);
    //         } else if (username === answer.username) {
    //             getAnswer(null, username, res);
    //         } else {
    //             res.send(answer);
    //         }
    //     });
};

module.exports.registerUser = registerUser;
module.exports.login = login;
// module.exports.registerGame = registerGame;
module.exports.submitAnswer = submitAnswer;
module.exports.getAnswer = getAnswer;
