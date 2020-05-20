import React, {Component} from 'react';
import {Jumbotron} from 'reactstrap'
import { Button, ButtonGroup, Modal, ModalHeader, 
    ModalBody, ModalFooter, Row, Col, Label, Card,CardBody,CardText,CardTitle,CardImg} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom'
import Header from './HeaderComponent';
import { Loading } from './LoadingComponent';
import EditModal from './Modals/EditModal';
import AddModal from './Modals/AddModal'
//import DeleteModal from './Modals/DeleteModal'

  
function RenderUsers ({users, isLoading,errMess}) {
    console.log(users)

    if (isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4 className="text-danger">{errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else {
        let count = 0;
        console.log(users)
        const Cards = users.map((user)=>{
            console.log(user)
            return(
                <>
                    <Card id = {user.id} style={{margin:10 , width:"20%", textAlign:"center"}}>
                        <CardImg top style={{width:"100%"}} src="/assets/img_avatar.png" alt="admin avatar"/>
                        <CardBody>
                        <div>{user.username}</div>
                            <Link to={`/users/${user.id}`}>Details</Link>
                        </CardBody>
                    </Card>
                </>
            )
        })
        return(
            <React.Fragment>
                    <div className="d-flex justify-content-center flex-wrap"> 
                        {
                            Cards
                        }
                    </div>
                    <hr/>
                        <Link to={`/users/add`}>
                            <Card style={{margin:10 , width:"20%", textAlign:"center"}}>
                                <CardImg top style={{width:"100%"}} src="/assets/img_add_avatar.png" alt="admin avatar"/>
                                <CardBody>
                                <div><i className="fa fa-plus"></i> Add User</div>
                                    
                                </CardBody>
                            </Card>
                        </Link>
            </React.Fragment>
        )
    }
}
function FinalRender({Auth, fetchLOGOUT, users,isLoading,errMess}) {
    console.log(typeof(Auth))
    if (Auth!="null"){
        return(
            <>  
                <Header fetchLOGOUT = {fetchLOGOUT} />
                <div className="container-paper">
                    <h1>Users</h1>
                    <hr/>
                    <Jumbotron>
                        <RenderUsers users={users} isLoading={isLoading} errMess={errMess} />
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
class UsersPage extends Component {
    constructor(props){
        super(props)
        this.state={
            Auth:localStorage.getItem("token")
        }
    }
    render(){
        return(
            <> 
                <FinalRender Auth={this.state.Auth} 
                users={this.props.users}
                isLoading={this.props.isLoading}
                errMess={this.props.errMess}
                fetchLOGOUT = {this.props.fetchLOGOUT} />
            </>
        )
    }
}
export default UsersPage