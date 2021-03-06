import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import AuthenticationService from './AuthenticationService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';


class TodoComponent extends Component{
    constructor(props){
      super(props)
      this.state={
          id : this.props.match.params.id,
          description : '',
          targetDate : moment(new Date()).format('YYYY-MM-DD') 
      }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    }

    componentDidMount(){

        if(this.state.id===-1){
            return
        }
        let username= AuthenticationService.getLoggedInUserName()
        TodoDataService.retreiveTodo(username, this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD') 
        })
        )
    }

    validate(values){
        let errors = {}
        if(!values.description){
            errors.description='Enter Description'
        }
        else if (values.description.length<5){
            errors.description='Enter Atleast 5 character'
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate='Enter a valida target date'
        }
        
        return errors
    }
    onSubmit(values){
        let username= AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: moment(values.targetDate).format('YYYY-MM-DD')
        }

        if(this.state.id ===-1){
            TodoDataService.createTodo(username, todo).then( () => this.props.history.push(`/todo`))
        }
        else{
        TodoDataService.updateTodo(username, this.state.id, todo).then( () => this.props.history.push(`/todo`))
        }
            
    }

    render(){
        let {description, targetDate} = this.state
        //let targetDate = this.state.targetDate
        return(
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                    initialValues={{description,targetDate}}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    enableReinitialize={true}

                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                       className="alert alert-warning"/>
                                    <ErrorMessage name="targateDate" component="div"
                                       className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="txt" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}
export default TodoComponent