import axios from "axios"

class HelloWorldService{
 
    executeHelloWorldService(){
        //console.log('Servide Csllled')
        return axios.get('http://localhost:8080/hello-world');
    }

    executeHelloWorldBeanService(){
        //console.log('Servide Csllled')
        return axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHelloWorldBeanPathVariableService(name){
        //console.log('Servide Csllled')
        // let username = 'Anant'
        // let password = 'dummy'

        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        
        return axios.get(`http://localhost:8080/hello-world-bean/${name}`
        // ,
        // {
        //     headers : {
        //         authorization: basicAuthHeader
        //     }
        // }
        );
    }

}export default new HelloWorldService()