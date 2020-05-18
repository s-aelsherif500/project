import React, { Component } from 'react';
import { Button, Modal, FormGroup, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, Label, Input, Jumbotron} from 'reactstrap';
import { Loading } from '../LoadingComponent';
function Options ({all_participants, participants, onChange}) {
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
      var checked = participants.find((option) => {
          console.log(option.id)
          return option.id==person.id
        })
        return(
          <tr>
              <th scope="row">{count+=1}</th>
              <td><input type="checkbox" defaultChecked={checked} value={person.id} onChange={onChange} /></td>
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
                        <tr>
                        {
                            Table
                        }
                        </tr>
                    </tbody>
                </table>
            </div>
          </Jumbotron>
        </>
      )
    }
  }
class EditGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
        isModalOpen: false,
        submitted:false,
        name:this.props.name,
        id:this.props.id,
        all_participants:this.props.all_participants,
        participants:this.props.participants,
        newParticipants:''
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeState = this.changeState.bind(this);
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
  changeState(){

  }
  checkOnChange(e) {
    var b = []
    let a = typeof(this.state.participants)=="object"? 
      this.state.participants.map( p => b.push(p.id)): this.state.participants.map( p => b.push(p))
    console.log(b)
    console.log(this.state.participants)
    console.log(this.props.participants,typeof(this.props.participants))
    // current array of options
    let options = b  
    console.log(options)
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(+e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      console.log(options)
      index = options.indexOf(+e.target.value)
      options.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ participants: options })
    console.log(this.state.participants)
    let unique = [...new Set(options)];
    console.log(unique)
  }
  handleSubmit=(event)=>{
      this.props.postUpdateGroup(this.state.name,this.state.id,this.props.Participants)
      console.log("SUBMITTED")
      this.toggleModal();
      window.location.href="/groups"
  }
  render(){
    console.log(this.state.participants)
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggleModal} className="btn btn-primary"><i className="fa fa-edit"></i> Edit Group</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="">
          <ModalHeader toggle={this.toggleModal}>Edit Group</ModalHeader>
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
                <Label md={12}><b>Choose the participants:</b></Label>
                <hr />
                <Col md={12}>
                  <Options all_participants={this.props.all_participants} 
                  participants={this.props.participants} onChange={this.checkOnChange.bind(this)} />
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

export default EditGroup;