import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LogInComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            username : 'Anant',
            password : '',
            islogInSuccessful : false,
            invalidCredentials : false
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleClickedLogIn = this.handleClickedLogIn.bind(this)
       // this.handlePasswordchange = this.handlePasswordchange.bind(this)
    }
    // handleUserNamechange(event){
    //  this.setState ({
    //     username : event.target.value
    //  })
    // }

    // handlePasswordchange(event){
    //     this.setState ({
    //         password : event.target.value
    //      })
    // }
    handlechange(event){
        console.log(event.target.name)
     this.setState(
         {
             [event.target.name] : event.target.value
         }
     )
    }
    handleClickedLogIn(){
        
        // if(this.state.username==='Anant' && this.state.password==='dummy'){
        // AuthenticationService.registerUserName(this.state.username, this.state.password)

        //     //this.props.history.push('/welcome/${this.state.username}')
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     // this.setState({islogInSuccessful :true})
        //     // this.setState({invalidCredentials :false})
        // }
        // else{

        //     this.setState({islogInSuccessful :false})
        //     console.log(this.state.invalidCredentials)
        //     this.setState({invalidCredentials :true})
            
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(() => {
        //     AuthenticationService.registerUserName(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }).catch(() => {
        //     this.setState({islogInSuccessful :false})
        //     this.setState({invalidCredentials :true})
        //     }
        // )

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then((response) => {
            AuthenticationService.registerUserNameForJwt(this.state.username, response.data.token)
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() => {
            this.setState({islogInSuccessful :false})
            this.setState({invalidCredentials :true})
            }
        )

    }



    render(){
    return(
        <div>
        <h1>LogIn</h1>
        <div className="container">
        {/* {<Showsuccessmessage islogInSuccessful={this.state.islogInSuccessful}/>} */}
        {/* {<InvalidCredentials invalidCredentials={this.state.invalidCredentials}/>}  */}
        {this.state.islogInSuccessful && <div>Log In Successfully</div>}
        {this.state.invalidCredentials && <div className="alert alert-warning">InvalidCredentials</div>}
        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handlechange}/>
        Password: <input type="password" name="password" value={this.state.password} onChange={this.handlechange}/>
        <button className="btn btn-success" onClick={this.handleClickedLogIn}>LogIn</button>
        </div>
        </div>
    )
    }
}export default LogInComponent
