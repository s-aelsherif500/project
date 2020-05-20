import React, { Component } from 'react'
import Login from './LoginComponent'
import HomePage from './HomeComponent'
import MainList from './MainList'
import Questions from './QuestionComponent'
import Group from './GroupComponent'
import Charts from './ChartComponent'
import GroupDetails from './GroupDetails'
import QuizForm from './QuizForm';  
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postLOGIN,
    fetchLOGOUT,
    fetchProfile,
    fetchParticipants,
    fetchGroups,
    fetchQuizes, 
    postParticipant,
    postUpdatePart, 
    postDeletePart,
    postGroup,
    postUpdateGroup,
    postQuiz,
    postUpdateQuiz } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      auth: state.auth,
      list:state.list,
      groups:state.groups,
      quizes:state.quizes
    }
  }
const mapDispatchToProps = dispatch => ({
    postLOGIN: (username,password) => dispatch(postLOGIN(username,password)),
    postParticipant: (first_name, last_name, email) => dispatch(postParticipant(first_name, last_name, email)),
    postUpdatePart: (first_name, last_name, email, id) => dispatch(postUpdatePart(first_name, last_name, email, id)),
    postDeletePart: (id) => dispatch(postDeletePart(id)),
    postGroup: (name, participants) => dispatch(postGroup(name, participants)),
    postUpdateGroup: (name, id, participants) => dispatch(postUpdateGroup(name, id, participants)),
    postQuiz: (name,items) => dispatch(postQuiz(name,items)),
    postUpdateQuiz: (id,name,items) => dispatch(postUpdateQuiz(id,name,items)),
    fetchProfile: () => { dispatch(fetchProfile())},
    fetchLOGOUT : () => {dispatch(fetchLOGOUT())},
    fetchParticipants: () =>{ dispatch(fetchParticipants())},
    fetchGroups: () => {dispatch(fetchGroups())},
    fetchQuizes: () => {dispatch(fetchQuizes())}
});


class Main extends Component {
    constructor(props){
        super(props)
        this.state={
            G:"g"
        }
    }
    componentDidMount(){
        this.props.fetchParticipants();
        this.props.fetchGroups();
        this.props.fetchQuizes();
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
        const QuizesPage = () => {
            return(
                <>  
                    <Questions 
                        fetchLOGOUT = {this.props.fetchLOGOUT}
                        postQuiz = {this.props.postQuiz}
                        Quizes = {this.props.quizes}/>
                </>
            )
        }
        const QuizPage = ({match}) =>{
            return(
                <>
                    <QuizForm  
                    quiz={(this.props.quizes.quizes.length!=0 && localStorage.getItem("token")!="null")? 
                        this.props.quizes.quizes.data.filter((quiz) => quiz.id === parseInt(match.params.quizId,10))[0] 
                        : {}
                    }
                    isLoading={this.props.quizes.isLoading}
                    errMess={this.props.quizes.errMess}
                    fetchLOGOUT = {this.props.fetchLOGOUT}
                    postUpdateQuiz={this.props.postUpdateQuiz} />
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
                        <Route exact path="/list" component={LIST} />
                        <Route exact path="/quizes" component={QuizesPage} />
                        <Route exact path="/groups" component={GroupPage} />
                        <Route exact path="/charts" component={ChartPage} />
                        <Route path='/quizes/:quizId' component={QuizPage} />
                        <Route path='/groups/:groupId' component={G_Details} />
                        <Redirect to={iniHref} />
                    </Switch>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)) 