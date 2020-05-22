import React, { Component } from 'react';
import Header from './HeaderComponent'
import {Jumbotron, Button, ButtonGroup
    , Breadcrumb,BreadcrumbItem } from 'reactstrap';
import {Loading} from './LoadingComponent'
import EditGroup from './Modals/EditGroup'
import {Link} from 'react-router-dom'
function RenderParticipants ({group, isLoading, errMess, all_participants,postUpdateGroup}) {

    if (isLoading) {
        return(
            <>
                <Loading />
            </>
        )
    }else if (errMess){
        return(
            <>
                <h3 className="text-danger">{errMess}</h3>
            </>
        )
    }else {
        let count = 0;
        var participants = group.participants.map((person) => 
            {
                return(
                    
                    <tr>
                        <th scope="row">{count+=1}</th>
                        <td>{person.first_name}</td>
                        <td>{person.last_name}</td>
                        <td>{person.email}</td>      
                        <td>
                            <ButtonGroup>
                                <Button color="warning">
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            })
        
        return(
            <>
                <h3>{group.name} </h3>
                <div style={{display:"block"}}>Created at <b>{group.created_at}</b></div>
                <div style={{display:"block"}}>Updated at <b>{group.updated_at}</b></div>
                <hr/>
                <br/>
                <EditGroup buttonLabel={''} all_participants={all_participants} 
                    postUpdateGroup={postUpdateGroup}
                    name={group.name}
                    id={group.id} 
                    participants={group.participants}/>
                <hr />
                <div className="container-list table-responsive">
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
                            {participants}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
function FinalRender ({Auth,group, isLoading, errMess, all_participants,fetchLOGOUT,postUpdateGroup}){
    if (Auth=="null") {
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
    }else {
        return(
            <>
                <Header fetchLOGOUT = {fetchLOGOUT}/>
                <div className="container-paper">
                    <h1>Groups</h1>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/groups">Groups</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{group.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <hr/>
                    <Jumbotron>
                        <RenderParticipants
                                    all_participants={all_participants} 
                                    group={group}
                                    isLoading={isLoading}
                                    errMess={errMess}
                                    postUpdateGroup={postUpdateGroup} />
                    </Jumbotron>
                </div>
            </>
        )
    }
}
class GroupDetails extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        console.log("RENDER GROUP", this.props.group)
        console.log(this.props)
        return(
            <>      
                <FinalRender 
                    Auth={localStorage.getItem("token")} 
                    all_participants={this.props.list} 
                    group={this.props.group}
                    isLoading={this.props.isLoading}
                    errMess={this.props.errMess}
                    fetchLOGOUT={this.props.fetchLOGOUT}
                    postUpdateGroup={this.props.postUpdateGroup} />
                />
            </>
        )
    }
}
export default GroupDetails;