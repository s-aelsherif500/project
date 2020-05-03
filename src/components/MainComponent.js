import React, { Component } from 'react'
import Login from './LoginComponent'
import HomePage from './HomeComponent'
import MainList from './MainList'
import Questions from './QuestionComponent'
import Group from './GroupComponent'
import Charts from './ChartComponent'
import GroupDetails from './GroupDetails'
import Groups from '../shared/Groups';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
const LoginPage = () => {
    return(
      <Login />
    )
  }
const Home = () => {
    return(
        <>
            <HomePage />
        </>
    )
}
const List = () => {
    return(
        <>
            <MainList />
        </>
    )
}
const QuestionPage = () => {
    return(
        <>  
            <Questions />
        </>
    )
}
const GroupPage = () => {
    return(
        <>  
            <Group />
        </>
    )
}
const ChartPage = () => {
    return(
        <>  
            <Charts />
        </>
    )
}

class Main extends Component {
    constructor(props){
        super(props)
        this.state={
            Groups:Groups,
        }
    }
    render(){
        const G_Details = ({match}) => {
            return(
                <>
                    <GroupDetails group={this.state.Groups.filter((group) => group.id === parseInt(match.params.groupId,10))[0]} />
                </>
            )
        }
        return(
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/list" component={List} />
                        <Route exact path="/questions" component={QuestionPage} />
                        <Route exact path="/groups" component={GroupPage} />
                        <Route exact path="/charts" component={ChartPage} />
                        <Route path='/groups/:groupId' component={G_Details} />
                        <Redirect to="/login" />
                    </Switch>
        )
    }
}
export default withRouter(Main) 