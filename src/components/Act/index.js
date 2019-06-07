import React from 'react';
import './index.css';
import Button from "react-bootstrap/Button";

const Act = (props) => {
    const { username, changeMode, answer, getAnswer } = props;

    let answerDefault = 'Your turn to act!';

    if (answer) answerDefault = (
        <div>
            <h2>{answer.answer}</h2>
            <p>submitted by {answer.username}</p>
        </div>
    );

    return (
        <div>
            <h2>{answerDefault}</h2>
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
