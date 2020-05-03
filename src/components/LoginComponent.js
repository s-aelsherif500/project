import React, {Component} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input} from 'reactstrap'; 
import {Link} from 'react-router-dom';

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => 
        {val.length > 0 && (valid = false);
    });
    return valid;
} 
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:null,
            password:null,
            newUsername:null,
            email:null,
            newPassword:null,
            formErrors:{
                username:'',
                password:'',
                newUsername:'',
                email:'',
                newPassword:'',
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleLogin = this.toggleLogin.bind(this)
        this.toggleSignup = this.toggleSignup.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        if(formValid(this.state.formErrors)){
            console.log(`
                --SUBMITTING--
            `)
        }

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
                formErrors.password = value.length < 8 && value.length > 0 ? 
                'minimum 8 characters required' : "";
                break;
            case 'newUsername':
                formErrors.newUsername = value.length < 3 && value.length > 0 ? 
                'minimum 3 characters required' : "";
                break; 
            case 'email':
                formErrors.email = emailRegex.test(value) && value.length > 0 ? 
                "" : "Invalid email address";
                break;
            case 'newPassword':
                formErrors.newPassword = value.length < 8 && value.length > 0 ? 
                'minimum 8 characters required' : "";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value})
    }
    handleChange(e) {
        const name = e.target.name
        this.setState({
            [name] : e.target.value
        })
        console.log(this.state)
    }
    
    componentDidMount(){
         
    }
    toggleSignup(){
        document.getElementById("login-toggle").style.backgroundColor="#fff";
         document.getElementById("login-toggle").style.color="#222";
         document.getElementById("signup-toggle").style.backgroundColor="#57b846";
         document.getElementById("signup-toggle").style.color="#fff";
         document.getElementById("login-form").style.display="none";
         document.getElementById("signup-form").style.display="block";
     }
     
    toggleLogin(){
         document.getElementById("login-toggle").style.backgroundColor="#57B846";
         document.getElementById("login-toggle").style.color="#fff";
         /*document.getElementById("signup-toggle").style.backgroundColor="#fff";
         document.getElementById("signup-toggle").style.color="#222";
         document.getElementById("signup-form").style.display="none";*/
         document.getElementById("login-form").style.display="block";
     }
    render(){
        const errors = this.state.formErrors;
        return(
            <>
            <body className = "body">
                <div class="form-modal">
                    <div class="form-toggle">
                        <button id="login-toggle" style={{float:"center"}} onClick={this.toggleLogin}>log in</button>
                        
                    </div>

                    <div id="login-form">
                        <form>
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
                            <Link to="/home" style={{textDecoration:'none', color:'white'}}>
                                <button type="button" className="btn login">login</button>
                            </Link>
                            <p style={{textAlign:"center"}}><a href="javascript:void(0)">Forgotten account</a></p>
                            <hr/>
                        </form>
                    </div>

                    <div id="signup-form">
                        <form>
                            <Input type="text" 
                                    className='input'  
                                    name="email" 
                                    id="Email" 
                                    value={this.state.email}
                                    placeholder="Enter your email"
                                    valid={this.state.formErrors.email===''}
                                    invalid={this.state.formErrors.email!==''}
                                    onBlur = {this.handleBlur}
                                    onChange={this.handleChange}
                                    />
                            <div className="text-danger">{errors.email}</div>
                            <Input type="text" 
                                    className='input'  
                                    name="newUsername" 
                                    id="newUsername" 
                                    value={this.state.newUsername}
                                    placeholder="Choose username"
                                    valid={this.state.formErrors.newUsername===''}
                                    invalid={this.state.formErrors.newUsername!==''}
                                    onBlur = {this.handleBlur}
                                    onChange={this.handleChange}
                                    />
                            <div className="text-danger">{errors.newUsername}</div>
                            <Input type="password" 
                                    className='input' 
                                    name="newPassword" 
                                    id="newPassword" 
                                    value={this.state.newPassword}
                                    placeholder="Enter Your Password"
                                    valid={this.state.formErrors.newPassword===''}
                                    invalid={this.state.formErrors.newPassword!==''}
                                    onBlur = {this.handleBlur}
                                    onChange={this.handleChange}
                                    />
                            <div className="text-danger">{errors.newPassword}</div>
                            <button type="button" className="btn signup">create account</button>
                            <p>Clicking <strong>create account</strong> means that you are agree to our <a href="javascript:void(0)">terms of services</a>.</p>
                            <hr/>
                        </form>
                    </div>

                </div>
                </body>
            </>
        )
    }
}