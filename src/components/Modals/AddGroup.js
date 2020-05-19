import React, { Component } from 'react';
import { Button, Modal, FormGroup, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, Label, Input, Jumbotron} from 'reactstrap';
import { Loading } from '../LoadingComponent';
function Options ({all_participants, onChange}) {
  if(all_participants.isLoading) {
    return(
      <>
        <Loading />
      </>
    )
  } else if (all_participants.errMess){
    return(
      <>
        <h3 className="text-danger">{all_participants.errMess}</h3>
      </>
    )
  } else {
    let count=0;
    let Table = all_participants.list.data.map((person)=>{
      count+=1;
      return(
        <tr key={count}>
            <th scope="row">{count}</th>
            <td><input type="checkbox" value={person.id} onChange={onChange} /></td>
            <td><b>{person.first_name}:</b></td>
            <td>{`"${person.email}"`}</td>
        </tr>
      )
    })
    return(
      <>
        <Jumbotron>
          <div className="container-list table-responsive">
            <table className="table">
                <tbody>
                    {
                        Table
                    }
                </tbody>
            </table>
          </div>
        </Jumbotron>
      </>
    )
  }
}
class AddGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
        isModalOpen: false,
        submitted:false,
        name:'',
        all_participants:this.props.all_participants,
        participants:[]
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
}
  toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
  }
  handleChange(event){
      this.setState({
          [event.target.name]:event.target.value
      })
  }
  checkOnChange(e) {
    // current array of options
    const options = this.state.participants
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(+e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(+e.target.value)
      options.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ participants: options })
  }
  handleSubmit=(event)=>{
      console.log(this.props)
      this.props.postGroup(this.state.name,this.state.participants)
      console.log("SUBMITTED")
      this.toggleModal();
      window.location.href="/groups"
  }
  render(){
    return (
      <React.Fragment>
        <Button color="success" onClick={this.toggleModal} className="add-member btn btn-success"><i className="fa fa-plus"></i> Add Group</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="">
          <ModalHeader toggle={this.toggleModal}>Add Group</ModalHeader>
          <ModalBody>
          <Form onSubmit={(event)=>this.handleSubmit(event)}>
              <Row className="form-group">
                <Label for="Name" md={12}>Name</Label>
                <Col md={12}>
                  <Input type="text" name="name" id="Name" placeholder="Enter Group's Name" onChange={this.handleChange} 
                    value={this.state.name} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={12}><b>Choose participants:</b></Label>
                <hr />
                <Col md={12}>
                  <Options all_participants={this.props.all_participants} onChange={this.checkOnChange.bind(this)} />
                </Col>
              </Row>
              <Button type="submit" color="success" style={{marginLeft:0}}>+ Add</Button>{' '}
              <Button color="danger" type="button" onClick={this.toggleModal} >Cancel</Button>
          </Form>
          </ModalBody>
          <ModalFooter>
            <hr />
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddGroup;