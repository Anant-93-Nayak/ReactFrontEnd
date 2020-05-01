import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'AuthenticationKey'

class AuthenticationService {


        executeBasicAuthenticationService(username, password){
          return axios.get(`${API_URL}/basicauth`, 
                            {headers: {authorization: this.createBasicAuthToken(username, password)}})
        }

        executeJwtAuthenticationService(username, password){
            return axios.post(`${API_URL}/authenticate`, {
                        username, 
                        password
                    })
          }

        createBasicAuthToken(username, password){
            return 'Basic ' + window.btoa(username + ":" + password)
        }

        registerUserName(username, password){
            //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
            sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
            this.setupAxiosInterceptor(this.createBasicAuthToken(username, password))
        }

        registerUserNameForJwt(username, token){
            //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
            sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
            this.setupAxiosInterceptor(this.createJWTToken(token))
        }

        createJWTToken(token){
            return 'Bearer ' + token
        }

        logout(){
            sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        }

        isUserLoggedIn() {
            let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            if(user===null) return false
            return true
        }

        getLoggedInUserName() {
            let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            if(user===null) return ''
            return user
        }

        setupAxiosInterceptor(token){
            // let username = 'Anant'
            // let password = 'dummy'

            // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
            
             axios.interceptors.request.use(
             (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token
                    }
                return config
                }
            )
        }


    
}

export default new AuthenticationService();