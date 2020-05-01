import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js';
import moment from 'moment'

class ListTodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos:[],
            message:null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
    }
        componentDidMount(){
            console.log('component did mount')
        this.refreshTodos()  
        console.log(this.state) 
        }

        refreshTodos(){
            console.log('Inside refreshTodos') 
            let username= AuthenticationService.getLoggedInUserName()
            TodoDataService.retreiveAllTodos(username)
            .then( 
                response => {
                this.setState({todos : response.data})
            })

        }
        deleteTodoClicked(id){
            let username= AuthenticationService.getLoggedInUserName()
            TodoDataService.deleteTodoForID(username, id)
            .then(
                response => {
                    this.setState({message : `Delete for the todo ${id} successful`})
                    this.refreshTodos()
                }
            )
         }

        addTodoClicked(){

            this.props.history.push(`/todo/-1`)
            // let username= AuthenticationService.getLoggedInUserName()
            // TodoDataService.deleteTodoForID(username, id)
            // .then(
            //     response => {
            //         this.setState({message : `Delete for the todo ${id} successful`})
            //         this.refreshTodos()
            //     }
            // )
         }


         updateTodoClicked(id){

            this.props.history.push(`/todo/${id}`)
            // let username= AuthenticationService.getLoggedInUserName()
            // TodoDataService.deleteTodoForID(username, id)
            // .then(
            //     response => {
            //         this.setState({message : `Delete for the todo ${id} successful`})
            //         this.refreshTodos()
            //     }
            // )
         }

    
    render() {
        return (
            <div>
                <div className="container">
                <h1>Todo List</h1>
               {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <table className="table">
                <thead>
                <tr>
                    <th>description</th>
                    <th>done</th>
                    <th>complete?</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>{
                   this.state.todos.map( todo =>
                <tr key={todo.id}>
                 <td>{todo.description}</td>
                 <td>{moment(todo.targetDate.toString()).format('YYYY-MM-DD')}</td>
                 <td>{todo.done.toString()}</td>
                 <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>UPDATE</button></td>
                 <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                </tr>
                    )}</tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
                </div>
                </div>
        )
    }
} export default ListTodoComponent