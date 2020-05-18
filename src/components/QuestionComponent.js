import React, { Component } from 'react';
import Header from './HeaderComponent';
import { 
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Jumbotron, Input } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class QForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false,
            newForm:"",
            choices:[],
            fullForm:[]
        };
        this.toggleModal = this.toggleModal.bind(this);
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
        console.log(e.target)
        let choice = e.target.value
        console.log(choice,choice=="input")
        if (choice=="input"){
            this.setState({
                newForm:"input"
            })
        } else if (choice=="select"){
            this.setState({
                newForm:"select"
            })
        }

    }
    handleClick(values){
        console.log(values)
        this.setState({
            fullForm:[2]
        })

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
    
    newForm = (newForm) => {
        if (newForm=="input") {
            return(
                <Control.text model="input" id=""/>
            )
        }else if(newForm=="select"){
            return(
                <>
                <Control.text model=".select" name="select" className="form-control" onChange={(e)=>this.renderChoices(e)} />
                {
                    this.state.choices.map((choice)=>{
                        return(
                            <>  
                                <Label htmlFor={choice} md={2}>{choice+1}</Label>
                                <Col md={10}>
                                    <Input type="text" id={choice} name={choice} />
                                </Col>
                            </>
                        )
                    })
                }
                </>
            )
        }
    }
    
    render(){
        const formic = this.state.fullForm.map(q => {
            return(
            <h4>{this.state.fullForm}</h4>
            )
        })
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> + Add Questions
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Questions</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        {
                            formic
                        }
                        
                        <LocalForm onSubmit={(values)=>this.handleClick(values)}>
                            <Row className="form-group">
                                {this.newForm(this.state.newForm)}
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