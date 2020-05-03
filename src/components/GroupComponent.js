import React, { Component } from 'react';
import Header from './HeaderComponent'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Jumbotron} from 'reactstrap';
import {Link} from 'react-router-dom'
import Groups from '../shared/Groups';
import Info from './InfoModal';
import AddGroup from './AddGroup'
class Group extends Component {
    constructor(props){
        super(props)
        this.state={
            Groups:Groups
        }
    }
    render(){
        const Groups = this.state.Groups.map((group) =>{
            return(
                <>
                <Card style={{margin:10, textAlign:"center"}}>
                    <CardBody>
                        <CardTitle style={{fontWeight:"bold",
                                           fontSize:20}}>Group no.{group.id}</CardTitle>
                                           <hr/>
                        <CardSubtitle><span style={{fontWeight:"bold"}}>No. of surveys</span>{' '}{group.survey.length}</CardSubtitle>
                        <CardText>{group.info}.</CardText>
                        <Info buttonLabel={'Info'} info={group.info} id = {group.id}/>
                        <Link to={`/groups/${group.id}`}>Go here</Link>
                    </CardBody>
                </Card>
                <br/>
                </>
            )
        })
        return(
            <>  
                <Header />
                <div className="container-paper">
                    <h1>Groups</h1>
                    <hr/>
                    <Jumbotron >
                    <AddGroup buttonLabel={'+ Add Group'}/>
                    <br/><br/>
                    <div className="d-flex justify-content-center flex-wrap">
                        {Groups}
                    </div>
                    </Jumbotron>
                    
                </div>
            </>
        )
    }
}
export default Group;