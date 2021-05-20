import React from 'react'
require('dotenv').config()

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {results: []}
        this.data = {}
        this.questionCount = 0
        this.resultCount = 0
        this.shouldCount = false
        this.shouldWarn = false
    }

    onSubmit = async e => {
        e.preventDefault();
        this.resultCount = 0;

        const answerCount = Object.keys(this.data).length ?? 0;

        if (answerCount !== this.questionCount) {
            this.shouldWarn = true;
            this.setState({waiting: true})
        }
        else{
            this.shouldWarn = false;

            await fetch(process.env.REACT_APP_API_URL + 'responder', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.data),
            })
            .then(async response => { this.setState({results: await response.json(), waiting: false}) })
            .catch( error => {console.log(error)})
        }

    }

    handleChange = e => {
        const key = e.target.name.toString()
        const value = e.target.value.toString()
        this.data[key] = value
    }

    renderDescription() {
        const description = this.props.quiz.description
        
        if (typeof(description) === 'undefined') {return (<div>carregando...</div>)}

        return(
            <h1>{description}</h1>
        )
    }

    renderQuestions() {
        const questions = this.props.quiz.perguntas

        if (typeof(questions) === 'undefined') {return (<div>carregando...</div>)}

        if (this.questionCount === 0) {this.questionCount = questions.length}

        return (
            <div>
            {   questions.map( (question, index) => (
                    <h3 key={index}> {question.description} {this.renderAlternatives(question._id, question.alternatives)} </h3> 
                )) 
            } 
            </div>
        )
    }

    renderAlternatives(questionId,alternatives) {
        return(
            <div>
                {
                    alternatives.map( (alternative, index) => (
                        <div key={index}>
                            <h5> <input type="radio" name={questionId} value={alternative._id}  onChange={this.handleChange}></input> {alternative.text} {this.renderResult(alternative._id)}</h5>
                        </div>
                    ))
                }
            </div>
        )
    }

    renderResult(alternativeId) {

        const result = this.state.results[alternativeId]
        if (result !== undefined) {this.shouldCount = true}
        
        if (result === true) {
            this.resultCount += 1;
            return "Acertou!"
        }
        if (result === false) {
            return "Errou!"
        }

    }

    renderCount() {

        if (this.shouldWarn) { 
            return (<p> Você ainda não respondeu todas as perguntas! Revise suas respostas.</p>)
        }

        if (this.shouldCount) {
            return (<p> Você acertou {this.resultCount} de {this.questionCount} questões </p>)
        }
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <div>
                    {this.renderDescription()}
                    {this.renderQuestions()}
                    <button>Enviar</button>
                    {this.renderCount()}
                </div>
            </form>
        )
    }
}

export default Quiz