import React, { Component } from 'react';
import Header from './HeaderComponent'
import {Jumbotron, Button, ButtonGroup} from 'reactstrap';
class GroupDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            group:this.props.group
        }
    }
    render(){
        return(
            <>  
                <Header />
                <div className="container-paper">
                <h1>Groups</h1>
                    <hr/>
                    <Jumbotron>
                        <h3>Group no.{this.state.group.id} </h3>
                        <hr />
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Survey</th>
                            <th scope="col">Info</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">no.of sendings</th>
                            <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.group.survey.map((survey) => 
                                    <tr>
                                        <th scope="row">{survey.id}</th>
                                        <td>{survey.name}</td>
                                        <td>{survey.info}</td>
                                        <td>{survey.startDate}</td>
                                        <td>{survey.endDate}</td>
                                        <td><b>T</b> {survey.sent}</td>       
                                        <td>
                                            <ButtonGroup>
                                                <Button key={survey.id} color="warning">
                                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        </table>
                    </Jumbotron>
                </div>
            </>
        )
    }
}
export default GroupDetails;