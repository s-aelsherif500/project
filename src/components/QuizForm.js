import React, { Component } from 'react';
import Header from './HeaderComponent'
import {Jumbotron, Breadcrumb,BreadcrumbItem,
     Row, Col, Label, Input, Form} from 'reactstrap';
import {Loading} from './LoadingComponent'
import EditQuiz from './Modals/EditQuiz'
import {Link} from 'react-router-dom'
function RenderForm ({items,id,Qname, postUpdateQuiz}) {
    if(items.length==0){
        return(
            <>
            </>
        )
    }else{
        return(
            <Jumbotron>
                <Form> 
                <EditQuiz id={id} items={items} Qname={Qname} postUpdateQuiz={postUpdateQuiz}/>
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
                                            <Input type="textarea" style={{height:100}}  id={index} />
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
function RenderQuiz ({quiz, isLoading, errMess, postUpdateQuiz}) {
    console.log(quiz)
    if (isLoading) {
        return(
            <>
                <Loading />
            </>
        )
    }else if (errMess){
        return(
            <>
                <h3 className="text-danger">{errMess}</h3>
            </>
        )
    }else {
        return(
            <>  
                <h3>{quiz.name} </h3>
                <div style={{display:"block"}}>Created at <b>{quiz.created_at}</b></div>
                <div style={{display:"block"}}>Updated at <b>{quiz.updated_at}</b></div>
                <hr/>
                <br/>
                <RenderForm items={quiz.items} Qname={quiz.name} id={quiz.id} postUpdateQuiz={postUpdateQuiz}/>
            </>
        )
    }
}
function FinalRender ({Auth,quiz, isLoading, errMess,fetchLOGOUT,postUpdateQuiz}){
    if (Auth=="null") {
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
    }else {
        return(
            <>
                <Header fetchLOGOUT = {fetchLOGOUT}/>
                <div className="container-paper">
                <h1>Quizes</h1>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/quizes">Quizes</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{quiz.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <hr/>
                    <Jumbotron>
                        <RenderQuiz
                                    quiz={quiz}
                                    isLoading={isLoading}
                                    errMess={errMess}
                                    postUpdateQuiz={postUpdateQuiz} />
                    </Jumbotron>
                </div>
            </>
        )
    }
}
class QuizForm extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        console.log("RENDER Quiz", this.props.quiz)
        console.log(this.props)
        return(
            <>      
                <FinalRender 
                    Auth={localStorage.getItem("token")} 
                    quiz={this.props.quiz}
                    isLoading={this.props.isLoading}
                    errMess={this.props.errMess}
                    fetchLOGOUT={this.props.fetchLOGOUT}
                    postUpdateQuiz={this.props.postUpdateQuiz} />
                />
            </>
        )
    }
}
export default QuizForm;