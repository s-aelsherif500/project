import React, { Component } from 'react'
import Login from './LoginComponent'
import HomePage from './HomeComponent'
import MainList from './MainList'
import Questions from './QuestionComponent'
import Group from './GroupComponent'
import Charts from './ChartComponent'
import GroupDetails from './GroupDetails'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postLOGIN,
    fetchLOGOUT,
    fetchProfile,
    fetchParticipants,
    fetchGroups, 
    postParticipant,
    postUpdatePart, 
    postDeletePart,
    postGroup,
    postUpdateGroup } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      auth: state.auth,
      list:state.list,
      groups:state.groups
    }
  }
const mapDispatchToProps = dispatch => ({
    postLOGIN: (username,password) => dispatch(postLOGIN(username,password)),
    postParticipant: (first_name, last_name, email) => dispatch(postParticipant(first_name, last_name, email)),
    postUpdatePart: (first_name, last_name, email, id) => dispatch(postUpdatePart(first_name, last_name, email, id)),
    postDeletePart: (id) => dispatch(postDeletePart(id)),
    postGroup: (name, participants) => dispatch(postGroup(name, participants)),
    postUpdateGroup: (name, id, participants) => dispatch(postUpdateGroup(name, id, participants)),

    fetchProfile: () => { dispatch(fetchProfile())},
    fetchLOGOUT : () => {dispatch(fetchLOGOUT())},
    fetchParticipants: () =>{ dispatch(fetchParticipants())},
    fetchGroups: () => {dispatch(fetchGroups())}
});


class Main extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    componentDidMount(){
        this.props.fetchParticipants();
        this.props.fetchGroups();
    }

    render(){
        let iniHref = localStorage.getItem("token")=="null"? '/login':'/home'
        let list = this.props.list;
        console.log(this.props)
        const G_Details = ({match}) => {
            return(
                <>
                    <GroupDetails 
                    group={(this.props.groups.groups.length!=0 && localStorage.getItem("token")!="null")? 
                        this.props.groups.groups.data.filter((group) => group.id === parseInt(match.params.groupId,10))[0] 
                        : {}
                    }
                    isLoading={this.props.groups.isLoading}
                    errMess={this.props.groups.errMess}
                    fetchLOGOUT = {this.props.fetchLOGOUT}
                    list={this.props.list}
                    postUpdateGroup={this.props.postUpdateGroup} />
                </>
            )
        }
        const LoginPage = () => {
            return(
              <Login postLOGIN={this.props.postLOGIN} />
            )
          }
        const Home = () => {
            return(
                <>
                    <HomePage 
                        fetchLOGOUT = {this.props.fetchLOGOUT} />
                </>
            )
        }
        const QuestionPage = () => {
            return(
                <>  
                    <Questions fetchLOGOUT = {this.props.fetchLOGOUT} />
                </>
            )
        }
        const GroupPage = () => {
            return(
                <>  
                    <Group Groups={this.props.groups} 
                        postGroup = {this.props.postGroup}
                        fetchLOGOUT = {this.props.fetchLOGOUT}
                        list={this.props.list} />
                </>
            )
        }
        const ChartPage = () => {
            return(
                <>  
                    <Charts fetchLOGOUT = {this.props.fetchLOGOUT} />
                </>
            )
        }
        const LIST = () =>{
            return(
                <MainList list={this.props.list} 
                    postParticipant={this.props.postParticipant}
                    postUpdatePart={this.props.postUpdatePart}
                    postDeletePart={this.props.postDeletePart} 
                    fetchLOGOUT = {this.props.fetchLOGOUT} />
            )
        }
        
        return(
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route exact path="/home" component={Home} />
                        <Route path="/list" component={LIST} />
                        <Route exact path="/questions" component={QuestionPage} />
                        <Route exact path="/groups" component={GroupPage} />
                        <Route exact path="/charts" component={ChartPage} />
                        <Route path='/groups/:groupId' component={G_Details} />
                        <Redirect to={iniHref} />
                    </Switch>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)) 