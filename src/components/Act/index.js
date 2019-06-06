import React from 'react';
import './index.css';
import Button from "react-bootstrap/Button";

const Act = (props) => {
    const { changeMode } = props;

    return (
        <div>
            <h2>Act</h2>
            <Button
                variant="success"
                onClick={() => changeMode('guess')}
            >Guess</Button>
        </div>
    );
};

export default Act;
