import React, { Component } from 'react';
import Header from './HeaderComponent'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Jumbotron} from 'reactstrap';
import {Link} from 'react-router-dom'
import Info from './InfoModal';
import AddGroup from './Modals/AddGroup'
import { Loading } from './LoadingComponent';

function RenderGroups ({Groups}) {
    if (Groups.isLoading) {
        return(
            <>
                <Loading />
            </> 
        )
    }else if (Groups.errMess) {
        return(
            <>
                <h2 className="text-danger">{Groups.errMess}</h2>
            </>
        )
    }else {
        console.log(Groups)
        const groups = Groups.groups.data.map((group) =>{
            return(
                <>
                    <Card id = {group.id} style={{margin:10, textAlign:"center"}}>
                        <CardBody>
                            <CardTitle style={{fontWeight:"bold",
                                            fontSize:20}}>{group.name}</CardTitle>
                                            <hr/>
                            <CardText>
                                <h5><b>Created at:</b>{group.created_at}.</h5>
                                <h5><b>Updated at:</b>{group.updated_at}.</h5>
                            </CardText>
                            <Info buttonLabel={'Info'} info={group.created_at} id = {group.id}/>
                            <Link to={`/groups/${group.id}`}>Go here</Link>
                        </CardBody>
                    </Card>
                    <br/>
                </>
            )
        })
        return(
                <>
                    {groups}
                </>
            )
    }
}
function FinalRender({Auth, fetchLOGOUT, Groups, all_participants, postGroup}) {
    console.log(typeof(Auth))
    if (Auth!="null"){
        return(
            <>  
                <Header fetchLOGOUT = {fetchLOGOUT} />
                <div className="container-paper">
                    <h1>Groups</h1>
                    <hr/>
                    <Jumbotron >
                    <AddGroup buttonLabel={'+ Add Group'} all_participants={all_participants} postGroup={postGroup} />
                    <br/><br/>
                    <div className="d-flex justify-content-center flex-wrap">   
                        <RenderGroups Groups={Groups} />
                    </div>
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
class Group extends Component {
    constructor(props){
        super(props)
        this.state={
            Groups:this.props.Groups,
            Auth: localStorage.getItem("token")
        }
    }
    render(){
        console.log(this.state.Groups)
        return(
            <>
                <FinalRender Auth={this.state.Auth} 
                    fetchLOGOUT={this.props.fetchLOGOUT}
                    Groups={this.state.Groups}
                    all_participants={this.props.list}
                    postGroup={this.props.postGroup} />
            </>
        )
    }
}
export default Group;