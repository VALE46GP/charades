const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    answer: String,
    username: String,
    created_at: Date,
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
