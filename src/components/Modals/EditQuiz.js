import React, { useState, Component } from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter,
   Jumbotron, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import update from 'react-addons-update';
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
    this.handleEdit = this.handleEdit.bind(this);

  }
  toggleModal() {
    console.log("openmodal")
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleChangeName(e){
    console.log(e.target.id)
    this.setState({
      Qname:e.target.value
    })
  }
  handleChange(event){
      this.setState({
          [event.target.name]:event.target.value
      })
  }
  handleEdit (event) {
      event.preventDefault()
      console.log("Editing ")
      this.props.postUpdateQuiz(this.state.id, this.state.Qname, this.state.items)
      .then(
        window.location.href=`/quizes/${this.state.id}`
      )
      console.log("Editing ")
      this.toggleModal();
  }
  handleChangeText(event){
    console.log(event.target.name)
    this.setState(update(this.state, {
        items: {
            [event.target.name]: {
                $set: {
                  "type":event.target.id,
                  "text":event.target.value
                }
            }
        }
    }));
  }
  handleChangeOptions(e){
    console.log(e.target.name)
    this.setState(update(this.state, {
      items: {
          [e.target.name]: {
              $set: {
                "type":"options",
                "text":e.target.value,
                "options":this.state.items[e.target.name].options
              }
          }
      }
    }));
  }
  handleChangeOption(e){
    var newOption=this.state.items[e.target.name].options
    newOption[e.target.id]=e.target.value
    var options = new Array()
    newOption.map(Option=>{
      console.log(Option)
      if (typeof(Option)!="object")
        {options.push({option:Option})}
      else {
        {options.push({option:Option.option})}
      }
    })
    console.log(typeof(options) , options )
    console.log(e.target.name)
    this.setState(update(this.state, {
      items: {
          [e.target.name]: {
              $set: {
                "type":"options",
                "text":this.state.items[e.target.name].text,
                "options":options
              }
          }
      }
    }))
  }
  render(){
    console.log(this.state.items)
    let count=-1
    return (
      <div>
        <Button color="primary" onClick={this.toggleModal} className="btn"><i className="fa fa-pencil"></i>{this.state.buttonLabel}Edit</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className={this.state.className}>
          <ModalHeader toggle={this.toggleModal}>Edit Quiz</ModalHeader>
          <ModalBody>
            <Jumbotron>
                <Form> 
                  <Row className="form-group">
                          <Input md={12} name="Qname" value={this.state.Qname} id="Qname" 
                          style={{fontWeight:"bold",fontSize:20}} placeholder="Quiz name" 
                          onChange={(e) => this.handleChangeName(e)} />
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
                                        <Label htmlFor={index} md={1}><b>{index}-</b></Label>
                                        <Col md={11}>
                                        <Input type="text" id="text" name={index-1} value={item.text} 
                                        onChange={(e)=>this.handleChangeText(e)}
                                          />
                                        </Col>
                                    </Row>
                                    <hr/>
                                    </>
                                )                            
                            } else if (item.type == "agree") {
                                return(
                                    <> 
                                    <Row className="form-group">
                                        <Label htmlFor={index} md={1}><b>{index}-</b> </Label>
                                        <Input type="text" md={11} id="agree" name={index-1} value={item.text} 
                                        onChange={(e)=>this.handleChangeText(e)}
                                          />
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
                                    <Label htmlFor={index} md={1}><b>{index}-</b></Label>
                                    <Col md={10}>
                                      <Input type="text" name={index-1} value={item.text} 
                                      onChange={(e)=>this.handleChangeOptions(e)}
                                            id={index} />
                                    </Col>
                                    <Col md={12}>
                                        {
                                            item.options.map((option)=>{
                                                count+=1;
                                                console.log(count)
                                                return(
                                                    <>
                                                        <Label md={{offset:2}} check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            <Input type="text" name={index-1} id={count} value={option.option} 
                                                            onChange={(e)=>this.handleChangeOption(e)}
                                                             />
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
                <hr/>
                <ButtonGroup>
                  <Button type="button" onClick={this.handleEdit} color="primary"><i className="fa fa-pencil"></i>Edit</Button>
                  <Button type="button" onClick={this.toggleModal} color="secondary">Cancel</Button>
                </ButtonGroup>
            </Jumbotron>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditQuiz;