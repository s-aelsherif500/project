import React, { Component } from 'react';
import Header from './HeaderComponent'
import {Jumbotron} from 'reactstrap'
class Questions extends Component {
    render(){
        return(
            <>  
                <Header />
                <div className="container-paper">
                    <h1>QuestionPage</h1>
                    <hr/>
                    <Jumbotron>
                        <h2>This page for Question Page </h2>
                    </Jumbotron>
                </div>
            </>
        )
    }
}
export default Questions;