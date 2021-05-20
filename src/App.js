import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FetchQuiz from './components/fetchQuiz'
import ListQuizzes from './components/listQuizzes'
require('dotenv').config()

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    };

    componentDidMount() {
    }

    componentDidUpdate(prop) {}

    render() {
        console.log(process.env.REACT_APP_TEST)

        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <ListQuizzes />} />
                    <Route exact path="/quiz/:id" render={(props) => <FetchQuiz {...props} />} />
                </Switch>
            </BrowserRouter>
        )

    }
}

export default App;