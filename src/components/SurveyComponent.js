import React , {Component} from 'react'
import Header from './HeaderComponent'
import {Jumbotron, Card,CardImg,CardBody, Button, Col,CardText} from 'reactstrap'
import {Link} from 'react-router-dom'
import { Loading } from './LoadingComponent';
function FinalRender({token, fetchLOGOUT,user,isLoading,errMess}) {
    console.log(typeof(Auth))
        if (isLoading) {
            return(
                <>
                    <Loading />
                </> 
            )
        }else if (errMess) {
            return(
                <>
                    <h2 className="text-danger">{errMess}</h2>
                </>
            )
        }else {
            return(
                <>  
                    <Header fetchLOGOUT = {fetchLOGOUT} />
                    <div className="container-paper">
                        <h1>Home</h1>
                        <hr/>
                        <Jumbotron>
                            <div className="d-flex justify-content-left flex-wrap">
                                <Col md={4}>
                                    <Card id = {user.id} style={{textAlign:"center"}}>
                                        <CardImg top style={{width:"100%"}} src="/assets/img_avatar.png" alt="admin avatar"/>
                                        <CardBody>
                                            <CardText><b>{user.username}</b> </CardText>
                                            <Button type="button" color="primary">
                                                <Link style={{color:"white",textDecoration:"none"}} to={`/users/${user.id}`}>
                                                    <i className="fa fa-pencil"></i> Edit</Link>
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                                
                            </div>
                            <div><Link to="/users">Manage Users</Link></div>
                        </Jumbotron>
                    </div>
                </>
            )
        }
}
class Survey extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        return(
            <> 
                <FinalRender 
                user={this.props.user}
                isLoading={this.props.isLoading}
                errMess={this.props.errMess} />
            </>
        )
    }
}
export default Survey