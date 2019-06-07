const mongoose = require('mongoose');

const answerHistorySchema = mongoose.Schema({
    answer: String,
    username: String,
    created_at: Date,
    last_used: Date,
});

const AnswerHistory = mongoose.model('answer_history', answerHistorySchema);

export default AnswerHistory;
