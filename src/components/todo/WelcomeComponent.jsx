import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            welcomeMessage : ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handelSuccessfulMessage = this.handelSuccessfulMessage.bind(this)
        this.handelError = this.handelError.bind(this)
    }
    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handelSuccessfulMessage(response))

        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handelSuccessfulMessage(response))

        HelloWorldService.executeHelloWorldBeanPathVariableService(this.props.match.params.name)
        .then(response => this.handelSuccessfulMessage(response))
        .catch(error => this.handelError(error))
    }
    
    handelSuccessfulMessage(response){
      this.setState ({welcomeMessage : response.data.message})
    }

    handelError(error){
        let errorMessage = ''
        if(error.message)
        {
            errorMessage += error.message
        }
        if(error.response && error.response.data)
        {
            errorMessage += error.response.data.message
        }
        this.setState ({welcomeMessage : errorMessage})
      }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    Explore your todo items<Link to="/todo">here</Link>
                </div>
                <div className="container">
                <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Your Name here</button>
                </div>
                <div className="container">
                {this.state.welcomeMessage}
                </div>
            </div>
        )
    }
} export default WelcomeComponent