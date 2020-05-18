import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class EditModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalOpen: false,
      submitted:false,
      buttonLabel:" ",
      className:`edit-${this.props.id}`,
      id :this.props.id,
      first_name:this.props.first_name,
      last_name:this.props.last_name,
      email:this.props.email,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    console.log("openmodal")
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
      event.preventDefault()
      console.log("Editing ")
      this.props.postUpdatePart(this.state.first_name,
                                this.state.last_name,
                                this.state.email,
                                this.state.id)
      .then(
        window.location.href="/list"
      )
      console.log("Editing ")
      this.toggleModal();
  }
  render(){
    return (
      <div>
        <Button color="primary" onClick={this.toggleModal} className="btn"><i className="fa fa-pencil"></i>{this.state.buttonLabel}Edit</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className={this.state.className}>
          <ModalHeader toggle={this.toggleModal}>Edit Member</ModalHeader>
          <ModalBody>
          <Form>
              <FormGroup>
                  <Label for="first_name">Name</Label>
                  <Input type="text" name="first_name" id="first_name" onChange={this.handleChange} 
                  placeholder="Enter name" value={this.state.first_name} />
              </FormGroup>
              <FormGroup>
                  <Label for="last_name">Name</Label>
                  <Input type="text" name="last_name" id="last_name" onChange={this.handleChange} 
                    placeholder="Enter name" value={this.state.last_name} />
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" onChange={this.handleChange}
                    placeholder="Enter Email" value={this.state.email} />
              </FormGroup>
                <Button color="primary" style={{marginLeft:0}} type="button" onClick={this.handleSubmit} >Confirm</Button>{' '}
                <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
          </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditModal;