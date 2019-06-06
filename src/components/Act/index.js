import React from 'react';
import './index.css';
import Button from "react-bootstrap/Button";

const Act = (props) => {
    const { username, changeMode, answer, getAnswer } = props;

    const answerDefault = answer ? answer.answer : 'Your turn to act!';

    return (
        <div>
            <h2>{answerDefault}</h2>
            <Button
                variant="danger"
                onClick={() => getAnswer(username)}
            >Act out the next answer</Button>
            <br />
            <Button
                variant="success"
                onClick={() => changeMode('guess')}
            >Back to guessing</Button>
        </div>
    );
};

export default Act;
