import React , {Component} from 'react'
import Header from './HeaderComponent'
import {Input,Jumbotron,Button,ButtonGroup
    , Card, CardImg, CardBody,Col , Breadcrumb,BreadcrumbItem 
    , Label, FormGroup} from 'reactstrap'
import {Link} from 'react-router-dom'

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => 
        {val.length > 0 && (valid = false);
    });
    return valid;
} 
class UserDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            username:this.props.username,
            password:this.props.password,
            id:this.props.id,
            checked:false,
            disabled:true,
            formErrors:{
                username:'',
                password:'',
            },
            err:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleSubmit(){
        if (this.state.checked){
            let password = this.props.postUpdatePassword(this.state.password,this.state.id)
            password.then((response => {
                console.log(response)
                if(response.success){
                    window.location.href = `/users/${this.state.id}`
                } else {
                    document.getElementById("error").innerHTML="Invalid username or password"
                }
            }))
        }
        let username = this.props.postUpdateUser(this.state.username,this.state.id)
        username.then((response => {
            console.log(response)
            if(response.success){
                window.location.href = `/users/${this.state.id}`
            } else {
                document.getElementById("error").innerHTML="Invalid username or password"
            }
        }))
        if(formValid(this.state.formErrors)){
            console.log(`
                --SUBMITTING--
            `)
        }
    }
    handleDelete(e){
        this.props.postDeleteUser(this.state.id)
        .then(
            window.location.href='/users'
        )
    }
    handleChange(e) {
        console.log(e.target.checked)
        const name = e.target.name
        if (name == "checked") {
            this.setState({
                checked:e.target.checked,
                disabled: !this.state.disabled
            })

        }
        this.setState({
            [name] : e.target.value
        })
    }
    handleBlur(e){
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;
        switch(name){
            case 'username':
                formErrors.username = value.length < 3 && value.length > 0 ? 
                'minimum 3 characters required' : "";
                break; 
            case 'password':
                formErrors.password = value.length < 5 && value.length > 0 ? 
                'minimum 5 characters required' : "";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value})
    }
    render(){
        const errors = this.state.checked;
        console.log(this.state)
        return(
            <div className="contanier" >
                <form onSubmit={(e) => this.handleSubmit(e)} style={{margin:"auto"}}>
                    <div style={{textAlign:"center"}} className="text-danger" id="error"></div>
                    <Col md={12}>
                        <Card style={{ textAlign:"center"}}>
                            <CardImg top style={{width:"100%"}} src="/assets/img_avatar.png" alt="admin avatar"/>
                            <CardBody>
                                <div>Update User Information</div>
                                <hr/>
                                <p>
                                    <b>Created at: </b> <span>{this.props.user.created_at}</span><br/>
                                    <b>Updated at: </b> <span>{this.props.user.updated_at}</span>
                                </p>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" name="checked" onChange={this.handleChange} value={this.state.checked}/>{' '}
                                        Also change the password
                                    </Label>
                                </FormGroup>
                                <Input type="text" 
                                    className='input'  
                                    name="username" 
                                    id="Username" 
                                    value={this.state.username}
                                    placeholder="Username"
                                    valid={this.state.formErrors.username===''}
                                    invalid={this.state.formErrors.username!==''}
                                    onBlur = {this.handleBlur}
                                    onChange={this.handleChange}
                                />
                                <div className="text-danger">{errors.username}</div>
                                <Input type="password" 
                                        className='input'  
                                        name="password" 
                                        id="Password" 
                                        value={this.state.password}
                                        placeholder="Enter Your Password"
                                        valid={this.state.formErrors.password===''}
                                        invalid={this.state.formErrors.password!==''}
                                        onBlur = {this.handleBlur}
                                        onChange={this.handleChange}
                                        disabled = {(this.state.disabled)? "disabled" : ""}
                                            />
                                <div className="text-danger">{errors.password}</div>
                            </CardBody>
                        </Card>
                        
                        <ButtonGroup>
                            <Button type="button" color="primary" onClick={(e)=>this.handleSubmit(e)}> 
                            <i className="fa fa-pencil"></i> Edit
                            </Button>
                            <Button type="button" color="danger" disabled={(this.props.profile.username!=this.props.user.username)? false:true} onClick={(e)=>this.handleDelete(e)}> 
                            <i className="fa fa-trash"></i> Delete
                            </Button>
                        </ButtonGroup>
                    </Col>
                    
                    
                    <hr/>
                </form>
            </div>
        )
    }
}

function FinalRender({Auth, fetchLOGOUT,user,profile,id,username, password, postUpdateUser,postUpdatePassword,postDeleteUser}) {
    console.log(typeof(Auth))
    if (Auth!="null"){
        return(
            <>  
                <Header fetchLOGOUT = {fetchLOGOUT} />
                <div className="container-paper">
                    <h1>Home</h1>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/users">Users</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{username}</BreadcrumbItem>
                    </Breadcrumb>
                    <Jumbotron>
                        <h4>Hello, {username}</h4>
                        <UserDetail postUpdateUser={postUpdateUser} 
                            postUpdatePassword={postUpdatePassword}
                            username={username}
                            password={password}
                            profile={profile}
                            user={user}
                            postDeleteUser={postDeleteUser}
                            id={id} />
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
class UpdateUser extends Component {
    constructor(props){
        super(props)
        this.state={
            Auth:localStorage.getItem("token")
        }
    }
    render(){
        console.log(this.props)
        return(
            <> 
                <FinalRender Auth={this.state.Auth} 
                    fetchLOGOUT = {this.props.fetchLOGOUT}
                    postUpdateUser= {this.props.postUpdateUser}
                    postUpdatePassword={this.props.postUpdatePassword}
                    username={this.props.user.username}
                    password={this.props.user.password}
                    profile={this.props.profile}
                    user={this.props.user}
                    id={this.props.user.id}
                    postDeleteUser={this.props.postDeleteUser} />
            </>
        )
    }
}
export default UpdateUser