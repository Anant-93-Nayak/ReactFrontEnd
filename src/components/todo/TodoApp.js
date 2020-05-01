import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderCompo from './HeaderComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import LogInComponent from './LogInComponent.jsx'
import FooterComponent from'./FooterComponent.jsx'
import LogOutComponent from './LogOutComponent.jsx'
import ListTodoComponent from './ListTodoComponent.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import TodoComponent from './TodoComponent.jsx'

class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
            
            <Router>
            <HeaderCompo/>
                <Switch>  
                <Route path="/" exact component={LogInComponent}/>
                <Route path="/login" component={LogInComponent}/>
                <AuthenticatedRoute path="/welcome/:name"  component={WelcomeComponent}/>
                <AuthenticatedRoute path="/todo/:id"  component={TodoComponent}/>
                <AuthenticatedRoute path="/todo"  component={ListTodoComponent}/>
                <AuthenticatedRoute path="/logout"  component={LogOutComponent}/>
                <Route component={ErrorComponent}/>
                </Switch>
                <FooterComponent/>
            </Router>
            
            </div>
        )
    }
}


// class WelcomeComponent extends Component{
//     render(){
// return<div>Welcome {this.props.match.params.name}</div>
// }
// }


// class HeaderComponent extends Component {
//     render() {
//         const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
//         console.log(isUserLoggedIn);
//         return(
//             <header>
//                 <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//                     <ul className="navbar-nav">
//                     {isUserLoggedIn && <li> <Link className="nav-link" to="/welcome/Anant">Home</Link></li>}
//                     {isUserLoggedIn && <li> <Link className="nav-link" to="/todo">Todos</Link></li>}
//                 </ul>
//                 <ul className="navbar-nav navbar-collapse justify-content-end" >
//                 {!isUserLoggedIn && <li> <Link className="nav-link" to="/login">LogIn</Link></li>}
//                 {isUserLoggedIn && <li> <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>LogOut</Link></li>}
//                 </ul>
//                 </nav>
//             </header>
//         )
//     }
// }









function ErrorComponent(){
    return<div>Error</div>
}


export default TodoApp;