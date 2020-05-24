import React, { Component } from 'react'
import Login from './LoginComponent'
import HomePage from './HomeComponent'
import MainList from './MainList'
import Questions from './QuestionComponent'
import Group from './GroupComponent'
import Charts from './ChartComponent'
import GroupDetails from './GroupDetails'
import QuizForm from './QuizForm';  
import UsersPage from './UsersComponent';
import AddUser from './AddUserComponent';
import UpdateUser from './UserDetailsComponet'
import Survey from './SurveyComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button"; //Add this line Here
import {
    fetchLOGOUT,
    fetchProfile,
    fetchParticipants,
    fetchGroups,
    fetchQuizes,
    fetchUsers, 
    fetchResults,

    postLOGIN,
    postParticipant,
    postUpdatePart, 
    postDeletePart,
    postGroup,
    postUpdateGroup,
    postDeleteGroup,
    postQuiz,
    postUpdateQuiz,
    postDelete,
    postUser,
    postUpdateUser,
    postUpdatePassword,
    postDeleteUser,
    postSendToPart,
    postSendToGroup,
    postQandA,
    
    postStart,
    postFinish,
    postGender,
    postAge,
    postEduLevel,
    postCurSchool,
    postHighEdu,
    postTextQ,
    postOptionQ,
 } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      auth: state.auth,
      list:state.list,
      profile:state.profile,
      groups:state.groups,
      quizes:state.quizes,
      users:state.users,
      results:state.results
    }
  }
const mapDispatchToProps = dispatch => ({
    postLOGIN: (username,password) => dispatch(postLOGIN(username,password)),
    postParticipant: (first_name, last_name, email) => dispatch(postParticipant(first_name, last_name, email)),
    postUpdatePart: (first_name, last_name, email, id) => dispatch(postUpdatePart(first_name, last_name, email, id)),
    postDeletePart: (id) => dispatch(postDeletePart(id)),
    postGroup: (name, participants) => dispatch(postGroup(name, participants)),
    postUpdateGroup: (name, id, participants) => dispatch(postUpdateGroup(name, id, participants)),
    postDeleteGroup: (id) => dispatch(postDeleteGroup(id)),
    postQuiz: (name,items) => dispatch(postQuiz(name,items)),
    postUpdateQuiz: (id,name,items) => dispatch(postUpdateQuiz(id,name,items)),
    postDelete: (id) => dispatch(postDelete(id)),
    postUser: (username,password) => dispatch(postUser(username,password)),
    postUpdateUser:(username,id) => dispatch(postUpdateUser(username,id)),
    postUpdatePassword: (password,id) => dispatch(postUpdatePassword(password,id)),
    postDeleteUser: (id) => dispatch(postDeleteUser(id)),
    postSendToPart: (id,quiz_id) => dispatch(postSendToPart(id,quiz_id)),
    postSendToGroup: (id,quiz_id) => dispatch(postSendToGroup(id,quiz_id)),

    postQandA: (access_code) => dispatch(postQandA(access_code)),
    postStart: (access_code) => dispatch(postStart(access_code)),
    postFinish: (access_code) => dispatch(postFinish(access_code)),
    postGender: (access_code,gender) => dispatch(postGender(access_code,gender)),
    postAge : (access_code,age) => dispatch(postAge(access_code,age)),
    postEduLevel: (access_code,educational_level) => dispatch(postEduLevel(access_code,educational_level)),
    postCurSchool: (access_code,current_school) => dispatch(postCurSchool(access_code,current_school)),
    postHighEdu: (access_code,highest_education) => dispatch(postHighEdu((access_code,highest_education))),
    postTextQ: (access_code,survey_item_id,answer) => dispatch(postTextQ((access_code,survey_item_id,answer))),
    postOptionQ: (access_code,survey_item_id,survey_item_option_id) => dispatch(postOptionQ(access_code,survey_item_id,survey_item_option_id)),

    fetchProfile: () => { dispatch(fetchProfile())},
    fetchLOGOUT : () => {dispatch(fetchLOGOUT())},
    fetchParticipants: () =>{ dispatch(fetchParticipants())},
    fetchGroups: () => {dispatch(fetchGroups())},
    fetchQuizes: () => {dispatch(fetchQuizes())},
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchResults: () => {dispatch(fetchResults())}
});


class Main extends Component {
    constructor(props){
        super(props)
        this.state={
            G:"g"
        }
    }
    componentDidMount(){
        this.props.fetchProfile();
        this.props.fetchParticipants();
        this.props.fetchGroups();
        this.props.fetchQuizes();
        this.props.fetchUsers();
        this.props.fetchResults();
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
                        quizes={this.props.quizes}
                        postUpdateGroup={this.props.postUpdateGroup}
                        postSendToGroup={this.props.postSendToGroup} />
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
                        fetchLOGOUT = {this.props.fetchLOGOUT}
                        postUser = {this.props.postUser}
                        user={this.props.profile.profile}
                        isLoading={this.props.profile.isLoading}
                        errMess={this.props.profile.errMess} />
                </>
            )
        }
        const Users = ()=>{
            return(
                <>
                    <UsersPage fetchLOGOUT = {this.props.fetchLOGOUT}
                        users={this.props.users.users.data}
                        isLoading={this.props.users.isLoading}
                        profile={this.props.profile.profile}
                        errMess={this.props.users.errMess}
                        postDeleteUser={this.props.postDeleteUser} />
                </>
            )
        }
        const QuizesPage = () => {
            return(
                <>  
                    <Questions 
                        fetchLOGOUT = {this.props.fetchLOGOUT}
                        postQuiz = {this.props.postQuiz}
                        Quizes = {this.props.quizes}
                        postDelete={this.props.postDelete}/>
                </>
            )
        }
        const AddUserPage = () => {
            return(
                <>
                    <AddUser 
                        fetchLOGOUT={this.props.fetchLOGOUT}
                        postUser={this.props.postUser}/>
                </>
            )
        }
        const UpdateUserPage = ({match}) =>{
            return(
                <UpdateUser 
                    user={(this.props.users.users.length!=0 && localStorage.getItem("token")!="null")? 
                            this.props.users.users.data.filter((user) => user.id === parseInt(match.params.userId,10))[0] 
                            : {}
                    }
                    profile={this.props.profile.profile}
                    fetchLOGOUT={this.props.fetchLOGOUT}
                    postUpdateUser={this.props.postUpdateUser}
                    postUpdatePassword={this.props.postUpdatePassword} 
                    postDeleteUser={this.props.postDeleteUser}/>
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
                        list={this.props.list}
                        postDeleteGroup={this.props.postDeleteGroup}
                        quizes={this.props.quizes}
                        postSendToGroup={this.props.postSendToGroup}  />
                </>
            )
        }
        const ChartPage = () => {
            return(
                <>  
                    <Charts fetchLOGOUT = {this.props.fetchLOGOUT}
                    results={this.props.results} />
                </>
            )
        }
        const LIST = () =>{
            return(
                <MainList list={this.props.list} 
                    postParticipant={this.props.postParticipant}
                    postUpdatePart={this.props.postUpdatePart}
                    postDeletePart={this.props.postDeletePart} 
                    fetchLOGOUT = {this.props.fetchLOGOUT}
                    quizes={this.props.quizes}
                    postSendToPart={this.props.postSendToPart} />
            )
        }
        const SurveyPage = ({match}) =>{
            return(
                <Survey token = {match.params.token}
                    postQandA = {this.props.postQandA}
                    postStart={this.props.postStart}
                    postFinish={this.props.postFinish}
                    postGender={this.props.postGender}
                    postAge={this.props.postAge}
                    postEduLevel={this.props.postEduLevel}
                    postCurSchool={this.props.postCurSchool}
                    postHighEdu={this.props.postHighEdu}
                    postTextQ={this.props.postTextQ}
                    postOptionQ={this.props.postOptionQ}
                 />
            )
        }
        
        return(
            <>
                <ScrollUpButton />
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/users/add" component={AddUserPage} />
                    <Route exact path="/users/:userId" component={UpdateUserPage} />
                    <Route exact path="/list" component={LIST} />
                    <Route exact path="/quizes" component={QuizesPage} />
                    <Route exact path="/groups" component={GroupPage} />
                    <Route exact path="/charts" component={ChartPage} />
                    <Route exact path='/quizes/:quizId' component={QuizPage} />
                    <Route exact path='/groups/:groupId' component={G_Details} />
                    <Route exact path='/survey/:token' component={SurveyPage} />
                    <Redirect to={iniHref} />
                </Switch>
            </>
)
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)) 