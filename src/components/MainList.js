import React, { Component } from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom'
import Header from './HeaderComponent';
import { Loading } from './LoadingComponent';
import EditModal from './Modals/EditModal';
import AddModal from './Modals/AddModal'
//import DeleteModal from './Modals/DeleteModal'

  
function RenderList ({props,postParticipant,postUpdatePart}) {
    console.log(props)

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4 className="text-danger">{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else {
        let count = 0;
        console.log(props)
        const Table = props.list.data.map((person)=>{
            console.log(person)
            return(
                <tr key={person.id}>
                    <th scope="row">{count+=1}</th>
                    <td>{person.first_name}</td>
                    <td>{person.last_name}</td>
                    <td>{person.email}</td>      
                    <td>
                        <ButtonGroup>
                            <Button id={person.id} color="warning" className="btn">
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                Send
                            </Button>
                            <EditModal buttonLabel = {'edit model'}
                                id={person.id}
                                first_name={person.first_name}
                                last_name={person.last_name}
                                email={person.email}
                                postUpdatePart = {postUpdatePart}
                              />
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
        return(
            <React.Fragment>
                <AddModal nextID ={props.list.data.length} 
                    postParticipant={postParticipant} />
                <table className="table">
                    <thead>
                        <tr>
                                <th scope="col"><b>#</b></th>
                                <th scope="col"><b>First Name</b></th>
                                <th scope="col"><b>Last Name</b></th>
                                <th scope="col"><b>Email</b></th>
                                <th scope="col"><b>Options</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Table
                        }
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}
function FinalRender({Auth, fetchLOGOUT, props, postParticipant,postUpdatePart}) {
    console.log(typeof(Auth),"",props)
    if (Auth!="null"){
        return(
            <>  
                <Header fetchLOGOUT = {fetchLOGOUT} />
                <div className="container-paper">
                    <h1>List of participants</h1>
                    <hr/>
                    <br/>
                    <div className="container-list table-responsive">
                        <RenderList props={props} 
                            postParticipant = {postParticipant}
                            postUpdatePart = {postUpdatePart} />
                    </div>
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
class MainList extends Component {
    constructor(props){
        super(props)
        this.state={
            Auth:localStorage.getItem("token")
        }
    }
        render(){
            const props=this.props
            console.log(props.list)
        return(
            <FinalRender Auth={this.state.Auth}
                props={this.props.list}
                postUpdatePart={this.props.postUpdatePart}
                postParticipant={this.props.postParticipant}
                fetchLOGOUT={this.props.fetchLOGOUT} />
        )
    }
}
export default MainList;

