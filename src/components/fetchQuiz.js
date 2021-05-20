import React, {Component} from 'react';
import Quiz from './quiz'
require('dotenv').config()

class FetchQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: []
        };
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + 'quiz/' + this.props.match.params.id)
            .then(async res => await res.json())
            .then((data) => {
                this.setState({ quiz: data})
            })
            .catch(console.log)
    }

    render() {

        return (
            <Quiz quiz={this.state.quiz} props={this.props} />
        )

    }
}

export default FetchQuiz;