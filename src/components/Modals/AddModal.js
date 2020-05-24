import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input,Row, Col, Label} from 'reactstrap';
import { LocalForm } from 'react-redux-form';
class AddModal extends Component {
  constructor(props){
    super(props)
    this.state = {
        isModalOpen: false,
        submitted:false,
        first_name:'',
        last_name:'',
        email:''
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
  handleSubmit=(event)=>{
      console.log(this.props)
      this.props.postParticipant(this.state.first_name,this.state.last_name,this.state.email)
      console.log("SUBMITTED")
      this.toggleModal();
      window.location.href="/list"
  }
  render(){
    return (
      <React.Fragment>
        <Button color="success" onClick={this.toggleModal} className="add-member btn btn-success"><i className="fa fa-plus"></i> Add Member</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="">
          <ModalHeader toggle={this.toggleModal}>Add Member</ModalHeader>
          <ModalBody>
          <LocalForm onSubmit={(event)=>this.handleSubmit(event)}>
              <Row className="form-group">
                <Label for="FirstName" md={12}>First Name</Label>
                <Col md={12}>
                  <Input model=".first_name" name="first_name" id="FirstName" placeholder="Enter first Name" onChange={this.handleChange} value={this.state.firstName} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label for="LastName" md={12}>Last Name</Label>
                <Col md={12}>
                  <Input name="last_name" id="LastName" placeholder="Enter last name" onChange={this.handleChange} value={this.state.lastName} />
                </Col>
              </Row>
              <Row className="form-group">
                  <Label for="exampleEmail" md={12}>Email</Label>
                  <Col md={12}>
                    <Input name="email" id="exampleEmail" placeholder="Enter Email" onChange={this.handleChange} value={this.state.email} />
                  </Col>
              </Row>
              <Button type="submit" color="success" style={{marginLeft:0}}>+ Add</Button>{' '}
              <Button color="danger" type="button" onClick={this.toggleModal} >Cancel</Button>
          </LocalForm>
          </ModalBody>
          <ModalFooter>
            <hr />
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddModal;