import React, {Component} from 'react';
import {Jumbotron, CardText, Button, ButtonGroup, Breadcrumb,BreadcrumbItem ,
    Card,CardBody,CardImg, Col} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom'
import Header from './HeaderComponent';
import { Loading } from './LoadingComponent';
import EditModal from './Modals/EditModal';
import AddModal from './Modals/AddModal'
//import DeleteModal from './Modals/DeleteModal'

  
class RenderUsers extends Component {
    constructor(props){
        super(props)
    }
    deleteUser(e){
        let id = e.target.name
        this.props.postDeleteUser(id)
        .then(
            window.location.href='/users'
        )
    }
    render(){
        let users=this.props.users,
        isLoading = this.props.isLoading,
        errMess = this.props.errMess,
        profile = this.props.profile;
        console.log(users,isLoading,errMess,profile)

        if (isLoading) {
            return(
                <div className="d-flex justify-content-left flex-wrap"> 
                    <Loading />
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
                console.log(user,profile.username)
                let id = user.id
                return(
                    <>
                        <Col md ={3} style={{marginBottom:20}}>
                            <Card id = {user.id} style={{textAlign:"center"}}>
                                <CardImg top style={{width:"100%"}} src="/assets/img_avatar.png" alt="admin avatar"/>
                                <CardBody>
                                    <CardText><b>{user.username}</b> </CardText>
                                    <ButtonGroup>
                                        <Button type="button" color="primary">
                                            <Link style={{color:"white",textDecoration:"none"}} to={`/users/${user.id}`}>Edit</Link>
                                        </Button>
                                        <Button type="button" color="danger" name={user.id} disabled={(profile.username != user.username)? false : true} onClick={(id) => this.deleteUser(id)}>Delete</Button>
                                    </ButtonGroup>
                                </CardBody>
                            </Card> 
                        </Col>
                    </>
                )
            })
            return(
                <React.Fragment>
                        <div className="d-flex justify-content-left flex-wrap"> 
                            {
                                Cards
                            }
                            
                            <Col md={3}>
                                <Link to={`/users/add`}>
                                    <Card style={{textAlign:"center"}}>
                                        <CardImg top style={{width:"100%"}} src="/assets/img_add_avatar.png" alt="admin avatar"/>
                                        <CardBody>
                                        <div><i className="fa fa-plus"></i> Add User</div>
                                            
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Col>
                        </div>
                        <hr/>
                </React.Fragment>
            )
        }
    }
}
function FinalRender({Auth, fetchLOGOUT, users,isLoading,errMess,profile,postDeleteUser}) {
    console.log(typeof(Auth))
    if (Auth!="null"){
        return(
            <>  
                <Header fetchLOGOUT = {fetchLOGOUT} />
                <div className="container-paper">
                    <h1>Home</h1>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Users</BreadcrumbItem>
                    </Breadcrumb>
                    <hr/>
                    <Jumbotron>
                        <RenderUsers users={users} isLoading={isLoading} errMess={errMess} postDeleteUser={postDeleteUser} profile={profile} />
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
            Auth:localStorage.getItem("token"),
            profile:this.props.profile
        }
    }
    render(){
        return(
            <> 
                <FinalRender Auth={this.state.Auth} 
                users={this.props.users}
                isLoading={this.props.isLoading}
                errMess={this.props.errMess}
                profile={this.state.profile}
                postDeleteUser={this.props.postDeleteUser}
                fetchLOGOUT = {this.props.fetchLOGOUT} />
            </>
        )
    }
}
export default UsersPage