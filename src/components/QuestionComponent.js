import React, { Component } from 'react';
import Header from './HeaderComponent';
import { 
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Jumbotron, Input } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

class QForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false,
            newQuestion:"input",
            items:[],
            text:"",
            type:""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange= this.handleChange.bind(this)
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    handleSubmit(values) {
        this.toggleModal();
        //this.props.postForm(id, values.rating, values.author, values.comment);
        //console.log('loook at this :-',this.props.addComment(this.props.dishId, values.rating, values.author, values.comment))
    }
    handleChange(e){
        console.log(e.target.value)
        let choice = e.target.value
        if (choice=="input"){
            this.setState({
                newQuestion:"input"
            })
        } else if (choice=="select"){
            this.setState({
                newQuestion:"select"
            })
        }

    }
    onTextChange(event){
        console.log(event.target.value)
        this.setState({
            text:event.target.value,
            type:"text"
        })
        console.log(this.state.type, "---", this.state.text)
        console.log(event.target.name)
    }
    handleClick(event){
        console.log("clicked")
        let Q = {
            text:this.state.text,
            type:this.state.type
        }
        console.log(Q)
        this.setState({
            items:this.state.items.push(Q),
        })
        this.setState({
            text:"",
            type:""
        })
        console.log(this.state.items)
    }
    renderChoices(e){
        var t = e.target.value;
        console.log(t,isNaN(parseInt(t, 10)))
        if (isNaN(parseInt(t, 10))){ 
            var out = Array.from(Array(parseInt("0", 10)), (_,x) => x); 
        } else {
            var out = Array.from(Array(parseInt(t, 10)), (_,x) => x);
        }
        
        console.log(out);
        this.setState({
            choices:out
        })
    }
    
    newQuestion = (newQuestion,text,type) => {
        if (newQuestion=="input") {
            return(
                <Col md={12}>
                    <Input type="text" model="input" name={type} 
                    onChange={(e) => this.onTextChange(e)} value={text} placeholder="Write your Question .."/>
                </Col>
            )
        }else if(newQuestion=="select"){
            return(
                <>
                    <Col md={12}>
                        <Input md={12} type="text" name="options"  className="form-control" placeholder="Write your question .." />
                    </Col>
                    <br />
                    <br />
                    <Col md={6}>
                        <Input type="text" name="selectA"  className="form-control" placeholder="No. of choices .." md={4} onChange={(e)=>this.renderChoices(e)} />
                    </Col>
                    <br /> <br />
                    <Col md={10}>
                        {
                                this.state.choices.map((choice)=>{
                                    return(
                                        <>  
                                            <Label htmlFor={choice} md={1}>{choice+1}: </Label>
                                            <Col md={10}>
                                                <Input type="text" id={choice} name={choice} placeholder={`Choice ${choice+1}`} />
                                            </Col>
                                        </>
                                    )
                                })
                        }
                    </Col>
                </>
            )
        }
    }
    
    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> + Add Questions
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Questions</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        
                        <LocalForm onSubmit={(values)=>this.handleClick(values)}>
                            <Row className="form-group">
                                {this.newQuestion(this.state.newQuestion, this.state.text, this.state.type)}
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="qtype" md={12}>Choose a Question Type</Label>
                                <Col md={12}>
                                    <Control.select model=".qtype" name="qtype" onChange={(e) => this.handleChange(e)}
                                        className="form-control">
                                        <option value="input">Input</option>
                                        <option value="select">Select</option>
                                    </Control.select>
                                </Col>
                                <Col md={12}>
                                    <Button type="submit">
                                        <span className="fa fa-pencil fa-lg"></span> + Add Question
                                    </Button>
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>       
                    </LocalForm>
                </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
function RenderComments() {
    return (
        <div className='col-12 m-1'>
            <QForm />
        </div>
    )
}
const Questions= (props) => {
   /* if (props.Qforms == null) {
        return (<div></div>)
    }*/
    return(
        <>  
            <Header />
            <div className="container-paper">
                <h1>QuestionPage</h1>
                <hr/>
                <Jumbotron>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <RenderComments />
                            </div>
                        </div>
                    </div>
                    
                </Jumbotron>
            </div>
        </>
    )

}
export default Questions;