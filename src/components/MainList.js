import React, { Component} from 'react';
import { Button, ButtonGroup} from 'reactstrap';
import Data from '../shared/Data'
import Header from './HeaderComponent';
import AddModal from './AddModal';
import EditModal from './EditModal';
//import Data from '../shared/Data'

class MainList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:Data
        }
    }
    render(){
        const data = this.state.data;
        return(
            <>  
                <Header />
                <div className="container-paper">
                    <h1>List of participants</h1>
                    <hr/>
                    <br/>
                    <div className="container-list table-responsive">
                    <AddModal buttonLabel = {'Add Member'}/>
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Group</th>
                            <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row) => 
                                    <tr>
                                        <th scope="row">{row.id}</th>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.group}</td>       
                                        <td>
                                            <ButtonGroup>
                                                <Button id={row.id} color="warning">
                                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                                </Button>
                                                <EditModal buttonLabel = {''}/>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
                
            </>
        )
    }
}
export default MainList;

