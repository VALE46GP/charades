import React, { Component } from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './index.css';
import InvalidUsernameAlert from "../Login/InvalidUsernameAlert";

class Guess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: 'answer...',
            username: props.user.username,
            isLoading: false,
        };
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    };

    handleAnswerChange = (event) => {
        this.setState({
            answer: event.target.value,
        })
    };

    handleNameChange = (event) => {
        this.setState({
            username: event.target.value,
        })
    };

    submitAnswer() {
        const { answer, username } = this.state;
        if (username.match(/^[0-9a-zA-Z]{0,16}$/) && answer !== 'answer...') {
            this.setState({
                answer: 'answer...',
                isLoading: true,
            }, () => {
                axios.post('/game/answers',
                    {
                        answer,
                        username,
                        created_at: new Date(),
                    }
                )
                    .then(() => {
                        this.setState({ isLoading: false });
                    });
            });
        }
    }

    render() {
        const { isLoading, username, answer } = this.state;
        const { changeMode } = this.props;
        return (
            <div>
                <Form.Control
                    placeholder={answer}
                    aria-label="answer"
                    as="textarea" rows="2"
                    onChange={this.handleAnswerChange}
                />
                <p />
                <InvalidUsernameAlert username={username}/>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button
                            variant="outline-secondary"
                            disabled={isLoading}
                            onClick={this.submitAnswer}
                        >
                            {isLoading
                                ? <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                : 'Submit as:'}
                        </Button>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder={username}
                        aria-label="name"
                        aria-describedby="basic-addon2"
                        onChange={this.handleNameChange}
                    />
                </InputGroup>
                <Button
                    variant="danger"
                    onClick={() => changeMode('act')}
                >It's my turn to act!</Button>
            </div>
        );
    };
}

export default Guess;
