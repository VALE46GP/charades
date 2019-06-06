import React, { Component } from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './index.css';
import InvalidUsernameAlert from "../Login/InvalidUsernameAlert";
import Modal from "react-bootstrap/Modal";

class Guess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            name: props.user.username,
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
            name: event.target.value,
        })
    };

    submitAnswer() {
        const { answer, name } = this.state;
        if (name.match(/^[0-9a-zA-Z]{0,16}$/)) {
            this.setState({
                answer: '',
                isLoading: true,
            }, () => {
                axios.post('/game/add-answer',
                    {
                        answer,
                        name,
                    }
                )
                    .then(() => {
                        this.setState({ isLoading: false });
                    });
            });
        }

    }

    render() {
        const { isLoading, name } = this.state;
        return (
            <div>
                <Form.Control
                    placeholder="answer..."
                    aria-label="answer..."
                    as="textarea" rows="2"
                    onChange={this.handleAnswerChange}
                />
                <p />
                <InvalidUsernameAlert username={name}/>
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
                        placeholder={name}
                        aria-label={name}
                        aria-describedby="basic-addon2"
                        onChange={this.handleNameChange}
                    />
                </InputGroup>
                <Button variant="danger">It's my turn to act!</Button>
            </div>
        );
    };
}

export default Guess;
