import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
require('dotenv').config()

class ListQuizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            quizId: null
        };
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + 'quiz/')
            .then(async res => await res.json())
            .then((data) => {
                this.setState({ quizzes: data})
            })
            .catch(console.log)
    }

    quizList() {
        const quizzes = this.state.quizzes
        if (quizzes.length <= 0) {return <h5>carregando...</h5>}

        return (
            <div>
            {   quizzes.map( (quiz, index) => (
                    <h5 key={index} id={quiz._id} onClick={this.handleClick}> {quiz.description} </h5> 
                )) 
            } 
            </div>
        )

    }

    handleClick = e => {
        this.setState({quizId: e.target.id})
    }

    redirectToQuiz() {
        const quizId = this.state.quizId
        if (quizId !== null && quizId !== undefined) {
            return <Redirect to={'/quiz/' + quizId} />
        }
    }

    render() {

        return (
            <div className = "container-fluid">
                <div className="Row">
                    <div className="col-md-10 col-lg-8 mx-auto">
                        <div className="text-center">
                            <h1> Quizzes disponíveis </h1>
                            {this.quizList()}
                            {this.redirectToQuiz()}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default ListQuizzes;