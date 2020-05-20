import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Jumbotron, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';

class EditQuiz extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalOpen: false,
      submitted:false,
      buttonLabel:" ",
      className:`edit-${this.props.id}`,
      id :this.props.id,
      Qname:this.props.Qname,
      items:this.props.items
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
      .then(
        window.location.href=`/quizes/${this.state.id}`
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
            <Jumbotron>
                <Form> 
                  <Row className="form-group">
                          <Input md={12} name="Qname" value={this.state.Qname} 
                          style={{fontWeight:"bold",fontSize:20}} placeholder="Quiz name"
                          onChange={(e) => this.handleChange(e)} />
                          <hr/>
                          <br/>
                  </Row>
                    {
                        this.state.items.map((item) => {
                            let index = this.state.items.indexOf(item) + 1;
                            console.log(this.state.items)
                            if (item.type=="text"){
                                return(
                                    <>
                                    <Row className="form-group">
                                        <Label htmlFor={index} md={12}><b>{index}-</b> {item.text}</Label>
                                        <Col md={12}>
                                            <Input type="textarea" style={{height:100}} id={index} />
                                        </Col>
                                    </Row>
                                    <hr/>
                                    </>
                                )                            
                            } else if (item.type == "agree") {
                                return(
                                    <> 
                                    <Row className="form-group">
                                        <Label htmlFor={index} md={12}><b>{index}-</b> {item.text}</Label>
                                        <Col md={12}>
                                            <span style={{color:"orange",fontSize:30}} className="fa fa-star"></span>{' '}
                                            <span style={{color:"orange",fontSize:30}} className="fa fa-star"></span>{' '}
                                            <span style={{color:"orange",fontSize:30}} className="fa fa-star"></span>{' '}
                                            <span style={{fontSize:30}} className="fa fa-star"></span>{' '}
                                            <span style={{fontSize:30}} className="fa fa-star"></span>
                                        </Col>
                                        <p style={{fontSize:100}}>&#128513;</p>
                                    </Row>
                                    </>
                                )
                            }
                            else if(item.type=="options") {
                                return(
                                <>
                                <Row className="form-group">
                                    <Label htmlFor={index} md={12}><b>{index}-</b> {item.text}</Label>
                                    <Col md={12}>
                                        {
                                            item.options.map((option)=>{
                                                return(
                                                    <>
                                                        <Label md={{offset:2}} check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                                {option.option}
                                                        </Label>
                                                        <br/>
                                                    </>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                                <hr/>
                                </>
                                )
                            }
                        }) 
                    }
                </Form>
            </Jumbotron>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditQuiz;