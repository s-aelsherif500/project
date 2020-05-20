import React , {Component} from 'react'
import Header from './HeaderComponent'
import {Jumbotron, Card,CardImg,CardBody} from 'reactstrap'
import {Link} from 'react-router-dom'
import { Loading } from './LoadingComponent';
function FinalRender({Auth, fetchLOGOUT,user,isLoading,errMess}) {
    console.log(typeof(Auth))

    if (Auth!="null"){
        if (isLoading) {
            return(
                <>
                    <Loading />
                </> 
            )
        }else if (errMess) {
            return(
                <>
                    <h2 className="text-danger">{errMess}</h2>
                </>
            )
        }else {
            return(
                <>  
                    <Header fetchLOGOUT = {fetchLOGOUT} />
                    <div className="container-paper">
                        <h1>Home</h1>
                        <hr/>
                        <Jumbotron>
                            <div className="d-flex justify-content-left flex-wrap">
                                <Card id = {user.id} style={{margin:10 , width:"20%", textAlign:"center"}}>
                                    <CardImg top style={{width:"100%"}} src="/assets/img_avatar.png" alt="admin avatar"/>
                                    <CardBody>
                                    <div>{user.username}</div>
                                        <Link to={`/users/${user.id}`}>Details</Link>
                                    </CardBody>
                                </Card>
                            </div>
                            <div><Link to="/users">Manage Users</Link></div>
                        </Jumbotron>
                    </div>
                </>
            )
        }
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
                <FinalRender Auth={this.state.Auth} fetchLOGOUT = {this.props.fetchLOGOUT}
                user={this.props.user}
                isLoading={this.props.isLoading}
                errMess={this.props.errMess} />
            </>
        )
    }
}
export default HomePage