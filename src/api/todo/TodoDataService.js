import Axios from "axios";
import { API_URL, JPA_API_URL } from '../../Constants'

class TodoDataService{
    retreiveAllTodos(name){
        return Axios.get(`${JPA_API_URL}/users/${name}/todos`)
    }

    retreiveTodo(name, id){
        return Axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    deleteTodoForID(name, id){
        console.log("Inside deleteTodoForID")
        return Axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo){
        console.log("Inside updateTodo")
        return Axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo){
        console.log("Inside createTodo")
        return Axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo)
    }
}export default new TodoDataService()