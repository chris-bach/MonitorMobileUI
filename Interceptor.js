import axios from "axios";
import { AsyncStorage } from 'react-native';

let token;
AsyncStorage.getItem('Authorization').then((res)=>{
    token = res;
});

export const axiosInstance = (props) => {

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Authorization');
            if (value !== null) {
                return value;
            }
        } catch (error) {
            // Error retrieving data
        }
        return null;
    };

    const instance = axios.create();
    const jwtToken = token;

    axios.interceptors.request.use(
        function (config) {
            if (jwtToken) {
                config.headers['Authorization'] = jwtToken;
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
