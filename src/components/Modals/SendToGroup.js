import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {Loading} from '../LoadingComponent'
class SendToGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalOpen: false,
      submitted:false,
      id:this.props.id,
      quiz_id:""
      
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  toggleModal() {
    console.log("openmodal")
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleChange(event){
        console.log(event.target.id , "===> ",event.target.value)
      this.setState({
          quiz_id:event.target.id
      })
  }
  handleSend=(event)=>{
      event.preventDefault()
      console.log("Editing ")
      this.props.postSendToGroup(this.state.id, this.state.quiz_id)
      .then(
       // window.location.href="/list"
      )
      console.log("Editing ")
      this.toggleModal();
  }
  render(){
        let quizes = this.props.quizes.quizes.data
        console.log(quizes)
        if (this.props.quizes.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.quizes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4 className="text-danger">{this.props.quizes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
            <div>
                <Button color="warning" onClick={this.toggleModal} type="button"><i className="fa fa-paper-plane" aria-hidden="true"></i>
                    Send</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className={this.state.className}>
                <ModalHeader toggle={this.toggleModal}>Choose a Quiz</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup tag="fieldset">
                        <legend>Choose a quiz to send </legend>
                        {
                            quizes.map((quiz)=>{
                                return(
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="quiz-choices" id={quiz.id} onChange={this.handleChange} />{' '}
                                                <b>{quiz.name}</b> / created at {quiz.created_at}
                                        </Label>
                                    </FormGroup>
                                )
                            })
                        }
                    </FormGroup>
                        <Button color="warning" style={{marginLeft:0}} type="button" onClick={this.handleSend} >Confirm</Button>{' '}
                        <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                </Form>
                </ModalBody>
                </Modal>
            </div>
            )
        }
    }
}

export default SendToGroup;