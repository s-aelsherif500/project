import React , {Component} from 'react'
import Header from './HeaderComponent'
import {Jumbotron} from 'reactstrap'
class HomePage extends Component {
    render(){
        return(
            <> 
                <Header />
                <div className="container-paper">
                    <h1>Home</h1>
                    <hr/>
                    <Jumbotron>
                        <h2>This page for Home Page </h2>
                    </Jumbotron>
                </div>
            </>
        )
    }
}
export default HomePage