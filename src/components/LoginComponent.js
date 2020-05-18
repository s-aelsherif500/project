import React, {Component, useState} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input} from 'reactstrap'; 
import {Link} from 'react-router-dom';

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
            formErrors:{
                username:'',
                password:'',
            },
            err:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.toggleLogin = this.toggleLogin.bind(this)
    }
    handleError() {
        this.setState({
            err:"Wrong Username or Password"
        })
    }
    handleSubmit(e){
        e.preventDefault()

        let Login = this.props.postLOGIN(this.state.username,this.state.password)
        console.log(Login)
        if(formValid(this.state.formErrors)){
            console.log(`
                --SUBMITTING--
            `)
        }
        Login.then((response => {
            if(response.payload.success){
                window.location.href = "/home"
            } else {
                document.getElementById("error").innerHTML="Invalid username or password"
            }
        }))
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
    handleChange(e) {
        const name = e.target.name
        this.setState({
            [name] : e.target.value
        })
    }
    

     
    toggleLogin(){
         document.getElementById("login-toggle").style.backgroundColor="#57B846";
         document.getElementById("login-toggle").style.color="#fff";
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
                            <form onSubmit={(e) => this.handleSubmit(e)}>
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
                                    <button type="submit" className="btn login">login</button>
                                <p style={{textAlign:"center"}}><a href="www.google.com">Forgotten account</a></p>
                                
                                <hr/>
                            </form>
                        </div>
                    </div>
                </body>
            </>
        )
    }
}