import React, { Component } from 'react';
import Header from './HeaderComponent';
import { 
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Jumbotron, Input, Form,
    Card, CardBody, CardTitle, CardText, ButtonGroup } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
import Info from './InfoModal';
import { Loading } from './LoadingComponent';
import update from 'react-addons-update';
function RenderForm ({items}) {
    if(items.length==0){
        return(
            <>
            </>
        )
    }else{
        return(
            <Jumbotron>
                <h3>This is preview for the quiz created </h3>
                <Form> 
                    {
                        items.map((item) => {
                            let index = items.indexOf(item) + 1;
                            console.log(items)
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
        )
    }
}
class QForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false,
            newQuestion:"input",
            postQuiz:this.props.postQuiz,
            items:new Array,
            Qname:"",
            text:"",
            type:"",
            options:[],
            choices:[],
            error:""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen,
          items:new Array
        });
      }
    handleSubmit() {
        this.state.postQuiz(this.state.Qname, this.state.items)
        this.toggleModal();
        window.location.href="/quizes"
     }
    handleChange(e){
        if (e.target.name == "qtype") {
            let choice = e.target.value
            if (choice=="input"){
                this.setState({
                    newQuestion:"input"
                })
            } else if(choice=="agree"){
                this.setState({
                    newQuestion:"agree"
                })
            } else if (choice=="select"){
                this.setState({
                    newQuestion:"select"
                })
            }
        } else if(e.target.name =="Qname") {
            this.setState({
                Qname:e.target.value
            })
        }
    }
    onTextChange(event){
        this.setState({
            text:event.target.value,
            type:"text"
        })
    }
    onAgreeChange(event){
        this.setState({
            text:event.target.value,
            type:"agree"
        })
    }
    onOptionChange(event){
        this.setState({
            text:event.target.value,
            type:"options"
        })
    }
    onOptionsChange(event){
        this.setState(update(this.state, {
            options: {
                [event.target.name]: {
                    $set: {"option":event.target.value}
                }
            }
        }));
    }
    handleClick(event){
        console.log((this.state.newQuestion))
        if (this.state.text==""){
            this.setState({
                error:"Please write down your question"
            })
        } else{
            this.setState({
                error:""
            })
            if (this.state.newQuestion=="input"){
                let Q = {
                    text:this.state.text,
                    type:"text"
                }
                this.setState({
                    items:[...this.state.items,Q]
                })
            }else if (this.state.newQuestion=="agree"){
                let Q = {
                    text:this.state.text,
                    type:"agree"
                }
                this.setState({
                    items:[...this.state.items,Q]
                })
            }else if(this.state.newQuestion=="select"){
                let Q = {
                    text:this.state.text,
                    type:"options",
                    options:this.state.options
                }
                this.setState({
                    items:[...this.state.items,Q]
                })
            }
        }
        this.setState({
            text:"",
            type:""
        })
    }

    renderChoices(e){
        var t = e.target.value;
        if (isNaN(parseInt(t, 10))){ 
            var out = Array.from(Array(parseInt("0", 10)), (_,x) => x); 
        } else {
            var out = Array.from(Array(parseInt(t, 10)), (_,x) => x);
        }
        this.setState({
            choices:out
        })
    }
    removeQuestion (e) {
        console.log("deleting")
        var array = [...this.state.items]; // make a separate copy of the array
        console.log(e.target.name ,"---", array)
        var index = e.target.name
        if (index !== -1) {
          array.splice(index, 1);
          console.log(array)
        }
        console.log(array)
      }
    TheForm = (items) => {
        return(
            <RenderForm items={items} />
        )
    }
    newQuestion = (newQuestion,text,type) => {
        if (newQuestion=="input") {
            return(
                <Col md={12}>
                    <Input type="text" model="input" name={type} 
                        onChange={(e) => this.onTextChange(e)} value={text} placeholder="Write your question .."/>
                </Col>
            )
        }else if (newQuestion == "agree") {
            return(
                <Col md={12}>
                    <Input type ="text" name={type} 
                    onChange={(e) => this.onAgreeChange(e)} value={text} placeholder="Write your question.." />
                </Col>
            )
        }else if(newQuestion=="select"){
            return(
                <>
                    <Col md={12}>
                        <Input md={12} type="text" name={type} value={text} onChange={(e) => this.onOptionChange(e)}  className="form-control" placeholder="Write your question .." />
                    </Col>
                    <br />
                    <br />
                    <Col md={6}>
                        <Input type="text" name="selectA"  className="form-control" placeholder="No. of choices .." md={4} 
                        onChange={(e)=>this.renderChoices(e)} />
                    </Col>
                    <br /> <br />
                    <Col md={10}>
                        {
                                this.state.choices.map((choice)=>{
                                    return(
                                        <>  
                                            <Label htmlFor={choice} md={1}>{choice+1}: </Label>
                                            <Col md={10}>
                                                <Input type="text" id={choice} name={choice} onChange={(e) =>this.onOptionsChange(e) } placeholder={`Choice ${choice+1}`} />
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
        console.log(this.state.items)
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-plus fa-lg"></span> Add Quizes
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Quizes</ModalHeader>
                <ModalBody>
                    <div className="text-danger">{this.state.error}</div>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <Input md={12} name="Qname" value={this.state.Qname} 
                        style={{fontWeight:"bold",fontSize:20}} placeholder="Quiz name"
                        onChange={(e) => this.handleChange(e)} />
                        <hr/>
                        <br/>
                        <div className="container">
                            {this.TheForm(this.state.items)}
                        </div>
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
                                        <option value="agree">Agree Question</option>
                                        <option value="select">Multiple Choice</option>
                                    </Control.select>
                                </Col>
                                <br/>
                                <br/>
                                <Col md={12}>
                                    <Button type="submit">
                                        <span className="fa fa-plus fa-lg"></span> Add Question
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>   
                        <Button type="submit" value="submit" color="primary">Submit</Button>    
                    </LocalForm>
                </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
function CreateQuiz({postQuiz}) {
    return (
        <div className='col-12 m-1'>
            <QForm postQuiz={postQuiz}/>
        </div>
    )
}
function RenderQuizes ({Quizes}) {
    if (Quizes.isLoading) {
        return(
            <>
                <Loading />
            </> 
        )
    }else if (Quizes.errMess) {
        return(
            <>
                <h2 className="text-danger">{Quizes.errMess}</h2>
            </>
        )
    }else {
        const quizes = Quizes.quizes.data.map((quiz) =>{
            return(
                <>
                    <Card id = {quiz.id} style={{margin:10, textAlign:"center"}}>
                        <CardBody>
                            <CardTitle style={{fontWeight:"bold",
                                            fontSize:20}}>{quiz.name}</CardTitle>
                                            <hr/>
                            <CardText>
                                <h5><b>Created at: </b>{quiz.created_at}.</h5>
                                <h5><b>Updated at: </b>{quiz.updated_at}.</h5>
                            </CardText>
                            <ButtonGroup>
                                <Button type="button" className="btn-danger">
                                <i className="fa fa-trash" aria-hidden="true"></i>Delete</Button>
                                <Button type="button" className="btn-warning">
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>Send</Button>
                            </ButtonGroup>
                            <br/>
                            <hr/>
                            <Link to={`/quizes/${quiz.id}`}>Show Quiz</Link>
                        </CardBody>
                    </Card>
                    <br/>
                </>
            )
        })
        return(
                <>
                    {quizes}
                </>
            )
    }
}
function FinalRender({ fetchLOGOUT, Quizes, postQuiz}) {
    const Auth = localStorage.getItem("token")
    if (Auth!="null"){
        return(
            <>  
                <Header fetchLOGOUT={fetchLOGOUT} />
                <div className="container-paper">
                    <h1>Quizes</h1>
                    <hr/>
                    <Jumbotron>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <CreateQuiz postQuiz={postQuiz} />
                                    <div className="d-flex justify-content-center flex-wrap">  
                                        <RenderQuizes Quizes={Quizes} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </Jumbotron>
                </div>
            </>
        )
    } else {
        return(
            <div className="container-paper">
                <h1>This page is Authorized</h1>
                <hr/>
                <br/>
                <div className="">
                    You can't see the page untill you <Link to="/login">sign in</Link>
                </div>
            </div>
        )
    }
}
const Questions= ({fetchLOGOUT,postQuiz, Quizes}) => {
    return(
        <>
            <FinalRender 
                fetchLOGOUT={fetchLOGOUT}
                Quizes={Quizes}
                postQuiz={postQuiz} />
        </>
    )
}
export default Questions;