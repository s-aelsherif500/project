import React,{Component} from 'react';
import Loading from './LoadingComponent';
import {Form, Input, Button, Label,Col,Row} from 'reactstrap'

class CreateForm extends Component{ 
    constructor(props){
        super(props);
        this.state={
            value:"4"
        }
    }
    handleSubmit = (values) => {
        alert('Current State is: ' + JSON.stringify(values));
    }
    handleChange = (e) =>{
        let target = e.target;
        this.setState({
            value:target.value
        })
        console.log(this.state.value)
    }
    render(){
    console.log(this.props.form);
        return(
            <>
                <Form id="form" onSubmit={(values)=>this.handleSubmit(values)}>
                    <h2>Answer the following question(s)</h2>
                    {
                        this.props.form.map((question)=>{
                            if(question.type=="input") {
                                console.log(question)
                                return(
                                    <Row key={question.key} className="form-group">
                                        <Label md={12} for={`question ${question.key}`}>{question.label}</Label>
                                        <Col style={{margin:"auto"}} md={8}>
                                            
                                            <Input className = "text" md={10} type="text" 
                                                name={`question ${question.key}`} 
                                                id={`question ${question.key}`}
                                                placeholder="Answer here" />
                                        </Col>
                                    </Row>
                                )
                            } else if(question.type=="select") {
                                return(
                                    <Row key={question.key} className="form-group">
                                        <Label md={12} for={`question ${question.key}`}>{question.label}</Label>
                                        <Col md={12}>
                                            <Input md={10} type="select" 
                                                name={`question ${question.key}`} 
                                                id={`question ${question.key}`}
                                                placeholder="Answer here">
                                                    <option default value="select">Select..</option>
                                                {question.props.options.map((option)=>{
                                                    return(
                                                        <option 
                                                            value={`option ${question.props.options.indexOf(option)}`}>
                                                                {option}
                                                        </option>
                                                    )
                                                })}
                                            </Input>
                                        </Col>
                                    </Row>
                                )
                            }else{
                                return(
                                    <Row key={question.key} className="form-group">
                                        <Label md={10} for={`question ${question.key}`}>{question.label}</Label>
                                        <Col style={{margin:"auto",paddingLeft:40}} md={8}>
                                        <span class="star-rating">
                                            <input type="radio" name="rating" value="1" onChange={(e)=>this.handleChange(e)}/><i></i>
                                            <input type="radio" name="rating" value="2" onChange={(e)=>this.handleChange(e)}/><i></i>
                                            <input type="radio" name="rating" value="3" onChange={(e)=>this.handleChange(e)}/><i></i>
                                            <input type="radio" name="rating" value="4" onChange={(e)=>this.handleChange(e)}/><i></i>
                                            <input type="radio" name="rating" value="5" onChange={(e)=>this.handleChange(e)}/><i></i>
                                        </span>
                                        </Col>
                                        <Col md={12}>
                                            <img className="emoji" src={`./assets/imgs/${this.state.value}.png`}/>
                                        </Col>
                                    </Row>
                                )
                            }
                        
                        })}
                    <Button primary type="submit">submit</Button>
                </Form>
            </>
        )
    }
    
}


const RenderForm=(props)=>{
    console.log(props.isLoading)
    if(props.isLoading){
        return(
            <div>
                <Loading />
            </div>
        )
    } else if (props.errMess) {
        return(
            <div>
                <h4 className="text-danger">ERROR: {props.errMess}</h4>
            </div>
        )
    } else {
        return(
            <div>
                <CreateForm form = {props.form} />
            </div>
        )
    }
}
class FormComponent extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const form = this.props.form
        console.log(this.props)
        return(
            <>
                <RenderForm isLoading = {this.props.isLoading}
                            errMess = {this.props.errMess}
                            form = {this.props.form}/>
            </>
        )
    }
}
export default FormComponent;