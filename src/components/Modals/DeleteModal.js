import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, Label} from 'reactstrap';
class DeleteModal extends Component {
  constructor(props){
    super(props)
    this.state = {
        isModalOpen: false,
        submitted:false,
        first_name:this.props.first_name,
        last_name:this.props.last_name,
        email:this.props.email,
        id:this.props.id
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
      this.props.postDeletePart(this.state.id)
      console.log("DELETED")
      this.toggleModal();
      window.location.href="/list"
  }
  render(){
    return (
      <React.Fragment>
        <Button color="danger" onClick={this.toggleModal} className="btn btn-danger"><i className="fa fa-trash"></i> Delete</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="">
            <ModalHeader toggle={this.toggleModal}>Delete Member</ModalHeader>
            <ModalBody>
            <Form onSubmit={(event)=>this.handleSubmit(event)}>
                <Row className="form-group">
                    <Label md={12}><b>Do you really want to delete this member?</b></Label>
                </Row>
                <hr />
                <Row className="form-group">
                        <Label md ={3} style={{fontWeight:"bold"}}>First Name:</Label>
                        <Label md ={9}>{this.state.first_name}</Label>
                </Row>
                <Row className="form-group">
                        <Label md ={3} style={{fontWeight:"bold"}}>Last Name:</Label>
                        <Label md ={9}>{this.state.last_name}</Label>
                </Row>
                <Row className="form-group">
                        <Label md ={3} style={{fontWeight:"bold"}}>Email:</Label>
                        <Label md ={9}>{this.state.email}</Label>
                </Row>
              <Button type="submit" color="danger" >Delete</Button>{' '}
              <Button color="secondary" type="button" onClick={this.toggleModal} >Cancel</Button>
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

export default DeleteModal;