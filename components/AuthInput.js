import React, {useState, useContext} from 'react'
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native'
import {Input, Block, theme, Button, Text} from 'galio-framework'
import {argonTheme} from "../constants";
import axios from "axios";
import {LogInContext} from "../context/LogInContext";

import * as authentication from "../Services/Auth"
import {login} from "../Services/Auth";

const { height, width } = Dimensions.get("screen");
function AuthInput(props){
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true)
    const [password, setPassword] = useState("");
    const [errorState, setError] = useState(true);
    const [errorText, setErrorText] = useState("");
    const [loggedIn, setLoggedIn] = useState(true)

    const {setUserInfo, setUserRoles, setUserOrganisation, setDirector, setInactiveJobs, setActiveJobs, setSubordinates} = useContext(LogInContext);

    function verifyEmail(input){
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(input)
    }
    function changeEmailHandler(input){
        setEmail(input);
        if(verifyEmail(input)){
            setEmailValid(true);
        }
        else{
            setEmailValid(false)
        }
    }
    function changePasswordHandler(input){
        setPassword(input);
    }
    function errorHandling(error){
        setError(true)
        setErrorText(error.response.data.userMessage)
    }
    async function logInHandler(){
        setLoading(true);
        try {
            changeEmailHandler(email)
            // const logindata = {
            //     "email":email,
            //     "password":password,
            // }
            // const resp = login(logindata)
            const resp = await axios.post("http://192.168.1.4:8080/api/login", {"email": email, "password": password})
                .then(setLoading(false))
                .catch(setError(true))
            setLoading(false);
            const data = resp.data;
            const user = {
                id: data.userId,
                email: data.userEmail,
                firstName: data.userFirstName,
                lastName: data.userLastName
            }
            // console.log("data", data)
            // console.log("organisation", data.organisations.[0])
            setUserInfo(user);
            setUserRoles(data.assignedRoles);
            setUserOrganisation(data.organisations.[0]);
            setDirector(data.directorData);
            setInactiveJobs(data.inactiveJobs);
            setActiveJobs(data.activeJobs);
            await setSubordinates(data.subordinates);
            await setLoggedIn(true)
            setError(false)
            props.nav.navigate("App")

        } catch(e){

            setError(true)
            errorHandling(e)
        }

    }

    return(
        <Block safe>
            {emailValid ? null : <Text color="red"> Please Enter Valid Email </Text>}
            {errorState ? <Text color="red" >{errorText}</Text> : null}
            <Input style={styles.input} rounded onChangeText={setEmail} value={email} type="email-address" autoCapitalize="none" color={theme.COLORS.BLACK}/>
            <Input style={styles.input} rounded password viewPass onChangeText={changePasswordHandler} value={password} autoCapitalize="none" color={theme.COLORS.BLACK}/>
            {loading ? <ActivityIndicator size="small" color="black"/> : null}
            <Button
                shadowless
                style={styles.button}
                color={argonTheme.COLORS.DEFAULT}
                onPress={logInHandler}

            >
                <Text style={{ fontFamily: 'open-sans-bold', fontSize: 14 }} color={theme.COLORS.WHITE}>
                    LOGIN
                </Text>
            </Button>
        </Block>
    )
}

export default AuthInput;

const styles = StyleSheet.create({
    input:{
        borderColor: "#0b4870",
        marginTop: 10

    },
    button:{
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
        color:"white",
    }

})
