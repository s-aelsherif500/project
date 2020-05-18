import React , {Component} from 'react'
import Header from './HeaderComponent'
import {Jumbotron} from 'reactstrap'
import {Link} from 'react-router-dom'

function FinalRender({Auth, fetchLOGOUT}) {
    console.log(typeof(Auth))
    if (Auth!="null"){
        return(
            <>  
                <Header fetchLOGOUT = {fetchLOGOUT} />
                <div className="container-paper">
                    <h1>Home</h1>
                    <hr/>
                    <Jumbotron>
                        <h2>This page for Home Page </h2>
                    </Jumbotron>
                </div>
            </>
        )
    } else {
        return(
            <div className="container-paper">
                <h1>This page is Authorized</h1>
                <hr/>
                <br/>
                <div className="">
                    You can't see the page untill you <Link to="/login">sign in</Link>
                </div>
            </div>
        )
    }
}
class HomePage extends Component {
    constructor(props){
        super(props)
        this.state={
            Auth:localStorage.getItem("token")
        }
    }
    render(){
        return(
            <> 
                <FinalRender Auth={this.state.Auth} fetchLOGOUT = {this.props.fetchLOGOUT} />
            </>
        )
    }
}
export default HomePage