import React from 'react';
import './index.css';
import Button from "react-bootstrap/Button";

const Act = (props) => {
    const { username, changeMode, answer, getAnswer } = props;

    let answerDefault = (
        <div>
            <h3>Your turn to act!</h3>
            <p />
        </div>
    );

    if (answer) answerDefault = (
        <div>
            <h2>{answer.answer}</h2>
            <small>submitted by <b>{answer.username}</b></small>
            <p />
        </div>
    );

    return (
        <div>
            {answerDefault}
            <Button
                variant="danger"
                onClick={() => getAnswer(username)}
            >Act out the next answer</Button>
            <p />
            <Button
                variant="success"
                onClick={() => changeMode('guess')}
            >Back to guessing</Button>
        </div>
    );
};

export default Act;
