import React , {Component} from 'react'
import Header from './HeaderComponent'
import {Input,Jumbotron,Button, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import {Link} from 'react-router-dom'

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => 
        {val.length > 0 && (valid = false);
    });
    return valid;
} 
class User extends Component {
    constructor(props){
        super(props)
        this.state={
            username:null,
            password:null,
            formErrors:{
                username:'',
                password:'',
            },
            err:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }
    handleSubmit(){
        let Add = this.props.postUser(this.state.username,this.state.password)
        console.log(Add)
        if(formValid(this.state.formErrors)){
            console.log(`
                --SUBMITTING--
            `)
        }
        Add.then((response => {
            console.log(response)
            if(response.success){
                window.location.href = "/users"
            } else {
                document.getElementById("error").innerHTML="Invalid username or password"
            }
        }))

    }
    handleChange(e) {
        const name = e.target.name
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
        const errors = this.state.formErrors;
        return(
            <div className="contanier justify-content-center" style={{width:"60%"}} >
                <form onSubmit={(e) => this.handleSubmit(e)} style={{margin:"auto"}}>
                    <div style={{textAlign:"center"}} className="text-danger" id="error"></div>
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
                                />
                    <div className="text-danger">{errors.password}</div>
                        <Button type="button" className="btn-success" onClick={(e)=>this.handleSubmit(e)}><i className="fa fa-plus"> Add user</i></Button>
                    <hr/>
                </form>
            </div>
        )
    }
}

function FinalRender({Auth, fetchLOGOUT,postUser}) {
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
                        <BreadcrumbItem active>new user</BreadcrumbItem>
                    </Breadcrumb>
                    <hr/>
                    <Jumbotron>
                        <h3>Add a new user</h3>
                        <User postUser={postUser}/>
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
class AddUser extends Component {
    constructor(props){
        super(props)
        this.state={
            Auth:localStorage.getItem("token")
        }
    }
    render(){
        return(
            <> 
                <FinalRender Auth={this.state.Auth} 
                    fetchLOGOUT = {this.props.fetchLOGOUT}
                    postUser = {this.props.postUser} />
            </>
        )
    }
}
export default AddUser