import React, { Component } from 'react';
import { Navbar,Nav,NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      componentDidMount(){
        const indicator = document.querySelector(".nav-indicator");
        const items = document.querySelectorAll(".nav-item");
        
        function handleIndicator(el) {
          items.forEach(item => {
            item.classList.remove("is-active");
            item.removeAttribute("style");
          });
        
          indicator.style.width = `${el.offsetWidth}px`;
          indicator.style.left = `${el.offsetLeft}px`;
          indicator.style.backgroundColor = el.getAttribute("active-color");
        
          el.classList.add("is-active");
          el.style.color = el.getAttribute("active-color");
        }
        
        items.forEach((item, index) => {
          item.addEventListener("click", e => {
            handleIndicator(e.target);
          });
          item.classList.contains("is-active") && handleIndicator(item);
        });
      }

    render() {
        return(
            <Navbar sticky="top" expand="md">
            <div className="container">
                <NavbarToggler onClick={this.toggleNav} style={{backgroundColor:'black', color:'white'}} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav className="nav npc" navbar>
                        <NavItem className="nav-item" dark>
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </NavItem>
                        <NavItem className="nav-item">
                            <NavLink className="nav-link" to="/list">Participants</NavLink>
                        </NavItem>            
                        <NavItem className="nav-item">
                            <NavLink className="nav-link" to="/questions">Questionare</NavLink>
                        </NavItem>
                        <NavItem className="nav-item">
                            <NavLink className="nav-link" to="/groups">Groups</NavLink>    
                        </NavItem>
                        <NavItem className="nav-item">
                            <NavLink className="nav-link" to="/charts">Charts</NavLink>
                        </NavItem>
                        <span className="nav-indicator"></span>
                    </Nav>
                    <Nav className="ml-auto nav npc" navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/login">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
        );
    }
}

export default Header;