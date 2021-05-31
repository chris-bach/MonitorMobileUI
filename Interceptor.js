/*
import axios from "axios";
import { AsyncStorage } from 'react-native';



const tokenGetter = async () => {
    let token;

    console.log("AsyncStorage", AsyncStorage.getItem("authorization"))
    await AsyncStorage.getItem("authorization").then((res) => {
        console.log("token getter response", res)
        return res;
    })


    return null;
}


export const axiosInstance = (props) => {
    console.log(props,"props")

    try{
        console.log("AsyncStorage", AsyncStorage.getItem("authorization"))
        AsyncStorage.clear()
    }catch (error) {
    }


    const instance = axios.create();

    let token = tokenGetter();

    console.log("interceptor token", token);
    /!*let jwtToken = token._W ? token._W : token;

    console.log(jwtToken, "jwt token in interceptor")*!/


    axios.interceptors.request.use(
        function (config) {
            /!*console.log("config", config.url)
            if (jwtToken) {
                config.headers['authorization'] = jwtToken;
            }
            else{
                console.log("test test",config.url)
            }*!/
            let fucker = tokenGetter()
            if(config.url !== "https://monitoraustralia.com/api/user/authorise"){
                console.log("the url is what we are looking for", config)
                console.log("token in the fucking interceptor", token)
                console.log("token in request", config.headers["authorization"])
                /!*if(AsyncStorag){
                    config.headers['authorization'] = token._W;
                }*!/
                console.log("fucker", fucker)
                if(fucker) {
                    config.headers['authorization'] = tokenGetter()
                }

            }
            return config;
        },
        function (err) {
            return Promise.reject(err);
        }
    );

    axios.interceptors.response.use(
        (response) =>
            new Promise((resolve) => {
                resolve(response);
            }),
        (error) =>{
            if(!error.response){
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
            if(error.response.status === 401){
                //return console.log("401 Interceptor");
               // console.log("JWT Token", jwtToken);
                console.log("This is the error", error)
                alert("Log in error!");
                return props.navigation.popToTop();
            }else {
                return new Promise((resolve, reject)=> {
                    reject(error);
                })
            }
        }
    );
    return instance;
}
*/
