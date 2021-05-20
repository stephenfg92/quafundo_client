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

    // Envia as respostas para o servidor.
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

    // Conforme o usuário seleciona alternativas, acumula dados para enviar ao servidor.
    handleChange = e => {
        const key = e.target.name.toString()
        const value = e.target.value.toString()
        this.data[key] = value
    }

    // Apresenta a descrição do quiz.
    renderDescription() {
        const description = this.props.quiz.description
        
        if (typeof(description) === 'undefined') {return (<div>carregando...</div>)}

        const imgURL = this.props.quiz.imgURL
        if (typeof(imgURL) !== 'undefined' && typeof(imgURL) !== null) {
            return (
                <div style={{backgroundImage: `url(${imgURL})`}}><h1 className="card-title text-center font-weight-bold py-4">{description}</h1></div>
            )
        }

        return(
            <h1 className="card-title text-center">{description}</h1>
        )
    }

    // Apresenta cada uma das perguntas do quiz.
    renderQuestions() {
        const questions = this.props.quiz.perguntas

        if (typeof(questions) === 'undefined') {return (<div>carregando...</div>)}

        if (this.questionCount === 0) {this.questionCount = questions.length}

        return (
            <div>
            {   questions.map( (question, index) => (
                    <div key={index}> <h3 className="text-center mb-3"> {question.description} </h3> {this.renderAlternatives(question._id, question.alternatives)} </div> 
                )) 
            } 
            </div>
        )
    }

    // Apresenta as alternativas de cada questão
    renderAlternatives(questionId,alternatives) {
        return(
            <div>
                {
                    alternatives.map( (alternative, index) => (
                        <div className="mb-3" key={index}>
                            <h5> <input type="radio" name={questionId} value={alternative._id}  onChange={this.handleChange}></input> <span className="ml-2">{alternative.text} {this.renderResult(alternative._id)}</span></h5>
                        </div>
                    ))
                }
            </div>
        )
    }

    // Indica se o usuário acertou ou não determinada pergunta.
    renderResult(alternativeId) {

        const result = this.state.results[alternativeId]
        if (result !== undefined) {this.shouldCount = true}
        
        if (result === true) {
            this.resultCount += 1;
            return <i className="bi-check-circle-fill text-success ml-2" role="img" aria-label="acertou"></i>
        }
        if (result === false) {
            return <i className="bi-x-circle-fill text-danger ml-2" role="img" aria-label="errou"></i>
        }

    }

    // Faz a contagem de acertos
    renderCount() {

        if (this.shouldWarn) { 
            return (<span className="ml-2"> Você ainda não respondeu todas as perguntas!</span>)
        }

        if (this.shouldCount) {
            return (<span className="ml-2"> Você acertou {this.resultCount} de {this.questionCount} questões </span>)
        }
    }

    // Apresnta o botão para envio das respostas ao servidor
    renderButton() {
        if (!this.shouldWarn) {
            return <button className="btn btn-outline-primary">Enviar</button>
        }
        else {
            return <button className="btn btn-outline-danger">Enviar</button>
        }
    }

    render() {
        return(
            <div className = "container-fluid">
                <div className="col-md-10 col-lg-5 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {this.renderDescription()}
                            <form onSubmit={this.onSubmit}>
                                <div>
                                    {this.renderQuestions()}
                                        {this.renderButton()}
                                        {this.renderCount()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quiz