import React , {Component} from 'react'
import Header from './HeaderComponent'
import {Jumbotron, Card,CardImg,CardBody, Button, Col,CardText, Form, Input,FormGroup,Row, Label} from 'reactstrap'
import {Link} from 'react-router-dom';
import update from 'react-addons-update';
import Rating from '@material-ui/lab/Rating';
class Survey extends Component {
    constructor(props){
        super(props)
        this.state={
            generalQ:false,
            surveyQA:false,
            start:true,
            survey:new Array(),
            hovered:false,
            token:"1682910431590190697132",//this.props.token
            answers:new Array(),
            answersV: [{
                "id":"",
                "type":"",
                "text":"",
                "answer":""
            },{
                "id":"",
                "type":"",
                "text":"",
                "answer":""
            },{
                "id":"",
                "type":"",
                "text":"",
                "answer":""
            },{
                "id":"",
                "type":"",
                "text":"",
                "answer":""
            }],
            participant:"",
            gender:"",
            age:"",
            eduLevel:"",
            curSchool:"",
            other_crrScholl:"",
            highEdu:""
        }
    }
    componentDidMount(){
        this.props.postQandA(this.state.token)
        .then(response=>{
            console.log(response)
            this.setState({
                survey:response.data.survey.items,
                participant:response.data.participant.first_name
            })
        })
    }
    handleStart(e){
        //this.props.postStart(this.state.token)
        this.setState({
            start:false,
            generalQ:true,
            surveyQA:false

        })
        this.setState({
            answersV:new Array(this.state.survey.length)
        })
    }
    handleSurvey(e){
        console.log("CLICKED")
        this.setState({
            surveyQA:true,
            start:false,
            generalQ:false
        })
        console.log(this.state.surveyQA)
        console.log(this.state.survey)
        this.state.survey.map((question,index) => {
            console.log(index)
            this.setState(update(this.state, {
                answersV: {
                    [index]: {
                        $set: {
                            "id":question.id,
                            "type":question.type,
                            "text":question.text,
                            "answer":e.target.value
                        }
                    }
                }
            }))
        })   
    }
    handleChangeV(e){
        console.log(e.target)
        this.setState(update(this.state, {
            answersV: {
                [e.target.name]: {
                    $set: {
                        "id":e.target.id,
                        "type":e.target.type,
                        "answer":e.target.value}
                    }
            }
        }))
    }
    handleChange(e){
        this.setState(update(this.state, {
            answers: {
                [e.target.id]: {
                    $set: {[e.target.name]:e.target.value}
                }
            }
        }))
    }

    handleSubmit(){
/*       
        postTextQ={this.props.postTextQ}
        postOptionQ={this.props.postOptionQ}
*/
        console.log(this.state.answers)
       this.props.postFinish(this.state.token)
       this.props.postGender(this.state.answers[0].gender)
       this.props.postAge(this.state.answers[1].age)
       this.props.postEduLevel(this.state.answers[2].eduLevel)
       this.props.postCurSchool(this.state.answers[3].curSchool)
       this.props.postHighEdu(this.state.answers[4].highEdu)

    }
    render(){
        console.log("All State : ",this.state)
        console.log(this.state.surveyQA)
        this.set
        if (this.state.start){
            return(
                <> 
                    <div className="form-paper">
                        <h1>MDT Quastionaire</h1>
                        <hr/>
                        <Jumbotron>
                            <div className="container">
                                <h2>Hoi {this.state.participant},</h2>
                                <p className="intro" style={{fontSize:20}}>
                                    Je gaat een vragenlijst invullen. 
                                    Er zijn geen foute antwoorden mogelijk! 
                                    Al jouw individuele antwoorden 
                                    blijven geheim. 
        
                                    Waarom deze vragenlijst? We willen een indruk krijgen
                                    hoe en welke vaardigheden zijn verbeterd tijdens je verblijf bij {} 
                                </p>
                                <Button style={{margin:"auto"}} type="button" className="start-quiz" 
                                    onClick={(e) => this.handleStart(e)}>
                                    BEGIN MET VRAGENLIJST</Button>
                            </div>
        
                        </Jumbotron>
                    </div>
                </>
            )   
        } else if (this.state.generalQ){
            return(
                <> 
                    <div className="form-paper">
                        <h1>MDT Quastionaire</h1>
                        <hr/>
                        <Jumbotron>
                            <h2>Hoi {this.state.participant},</h2>
                            <hr/>
                            <br/>
                            <Form>
                                
                                <h4>GESLACHT</h4>
                                <Row className="form-group">
                                    <Label md={5} for={0}><b>A1-</b>lk ben een:</Label>
                                    <Col md={3}>
                                        <Input type="select" name="gender" id={0} onChange={(e)=>this.handleChange(e)}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="not-to-say">prefer not to say</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <hr/>
                                <h4>LEEFTIJD</h4>
                                <Row className="form-group">
                                    <Label md={5} for={1}><b>A2-</b>Kies je genboortegaar</Label>
                                    <Col md={3}>
                                        <Input type="text" name="age" id={1} onChange={(e) => this.handleChange(e)}/>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row className="form-group">
                                    <Label md={12} for={2}><b>A3-</b>WELK OPLEIDINGSNIVEAU DOE JE OP DIT MOMENT?</Label>
                                    <Col md={10}>
                                        <Input type="select" name="eduLevel" id={2} onChange={(e) => this.handleChange(e)}>
                                            <option value="praktijkschool">praktijkschool</option>
                                            <option value="entreeopleiding">entreeopleiding</option>
                                            <option value="VMBO KB">VMBO KB</option>
                                            <option value="VMBO BB">VMBO BB</option>
                                            <option value="VMBO TL">VMBO TL</option>
                                            <option value="HAVO">HAVO</option>
                                            <option value="HAVO">VWO</option>
                                            <option value="MBO">MBO</option>
                                            <option value="HBO">HBO</option>
                                            <option value="WO">WO</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row className="form-group">
                                    <Label md={12} for={3}><b>A4-</b>OP WELKE SCHOOL ZIT JE MOMENTEEL?</Label>
                                    <Col md={10}>
                                        <Input type="select" name="curSchool" id={3} onChange={(e) => this.handleChange(e)}>
                                            <option value="praktijkschool Terra Nigra">praktijkschool Terra Nigra</option>
                                            <option value="VO Bernard Lievegoed School">VO Bernard Lievegoed School</option>
                                            <option value="VO Bonnefanten College">VO Bonnefanten College</option>
                                            <option value="VO Sint-Maartenscollege">VO Sint-Maartenscollege</option>
                                            <option value="VO Porta Mosana College">VO Porta Mosana College</option>
                                            <option value="VO Stella Maris College">VO Stella Maris College</option>
                                            <option value="OPDC St. Michael">OPDC St. Michael</option>
                                            <option value="United World College">United World College</option>
                                            <option value="MBO VISTA college">MBO VISTA college</option>
                                            <option value="MBO CITAVERDE College">MBO CITAVERDE College</option>
                                            <option value="HBO Zuyd Hogeschool">HBO Zuyd Hogeschool</option>
                                            <option value="WO Maastricht University">WO Maastricht University</option>
                                            <option value="Business School Notenboom">Business School Notenboom</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row className="form-group">
                                    <Label md={12} for={4}><b>A5-</b>WAT IS HET HOOGSTE OPLEIDINGSNIVEAU DAT JE HEBT AFGEROND MET EEN DIPLOMA?</Label>
                                    <Col md={10}>
                                        <Input type="select" name="highEdu" id={4} onChange={(e) => this.handleChange(e)}>
                                            <option value="ik heb (nog) geen diploma"> ik heb (nog) geen diploma </option>
                                            <option value="praktijkschool">praktijkschool</option>
                                            <option value="entreeopleiding">entreeopleiding</option>
                                            <option value="VMBO KB">VMBO KB</option>
                                            <option value="VMBO BB">VMBO BB</option>
                                            <option value="VMBO TL">VMBO TL</option>
                                            <option value="HAVO">HAVO</option>
                                            <option value="HAVO">VWO</option>
                                            <option value="MBO">MBO</option>
                                            <option value="HBO">HBO</option>
                                            <option value="WO">WO</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <hr/>
                            </Form>
                            <Button color = "success" type="button" onClick={(e) => this.handleSurvey(e)}>
                                Go to Survey -></Button>
                        </Jumbotron>
                    </div>
                </>
            )
        }else if (this.state.surveyQA){
            let count = 0;
                return(
                <>
                    <div className="form-paper">
                        <h1>MDT Quastionaire</h1>
                        <hr/>
                        <Jumbotron>
                            <h2>Hoi {this.state.participant},</h2>
                            <hr/>
                            <br/>
                            <Form>
                                {
                                    this.state.survey.map(question =>{
                                        count+=1;
                                        if(question.type=="text"){
                                            return(
                                                <FormGroup>
                                                    <Label for={question.id}><b>{count}-</b> {question.text}</Label>
                                                    <Input id={question.id} onChange={(e) => this.handleChangeV(e)}
                                                    value={this.state.answersV[count-1].answer} name={count-1} placeholder="Answer this Question"/>
                                                </FormGroup>
                                            )
                                        } else if(question.type=="agree") {
                                            return(
                                                <Row className="form-group">
                                                <Label md={12}><b>{count}-</b> {question.text}</Label>
                                                <Col md={12}>
                                                <Rating
                                                    name={count-1}
                                                    id = {question.id}
                                                    value={this.state.answersV[count-1].answer}
                                                    onChange={(e) => this.handleChangeV(e)}
                                                    />
                                                </Col>
                                                <p style={{fontSize:100}} >&#128513;</p>
                                            </Row>
                                            )
                                        } else if (question.type=="option"){
                                            return(
                                                <FormGroup>
                                                    <Label for={question.id}>{question.text}</Label>
                                                    <Input id={question.id} placeholder="Answer this Question"/>
                                                </FormGroup>
                                            )
                                        }
                                    })
                                }
                            </Form>
                        </Jumbotron>
                    </div>                        
                </>

                )    
        } else {
            return(
                <> 
                    <div className="form-paper">
                        <h1>MDT Quastionaire</h1>
                        <hr/>
                        <Jumbotron>
                            <h2>Hoi {this.props.token},</h2> 
                            <p>
                                Error: 404 this quiz page not found
                            </p>
        
                        </Jumbotron>
                    </div>
                </>
            )
        }
    }
}
export default Survey