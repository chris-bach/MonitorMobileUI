import React, {useState, useEffect, useContext, useRef} from 'react'
import {StyleSheet, Dimensions, View, Platform, ActivityIndicator} from 'react-native'
import {Input, Block, theme, Button, Text} from 'galio-framework'
import {argonTheme} from "../constants";
import axios from "axios";
import {LogInContext} from "../context/LogInContext";
import {MONITOR_URL} from "../constants/MonitorConstants";

import {login} from "../Services/Auth";

const { height, width } = Dimensions.get("screen");

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
//import React, { useState, useEffect, useRef } from 'react';
//import { Text, View, Button, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';

/**
 * @author Expo
 * @description Notifications handler
 */
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

/**
 * @author Manik Bagga
 * @description This component renders and handles the form for logging in
 */
function AuthInput(props){

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true)
    const [password, setPassword] = useState("");
    const [errorState, setError] = useState(true);
    const [errorText, setErrorText] = useState("");
    const [loggedIn, setLoggedIn] = useState(true)

    const {setUserInfo, setUserRoles, setUserOrganisation, setDirector, setInactiveJobs, setActiveJobs, setSubordinates} = useContext(LogInContext);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    /**
     * @author Expo
     * @description This useEffect handles token registration, and notification listener and response
     */
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    /**
     * @author Manik Bagga
     * @description The following functions handle login verification and error checkjing for the login page
     */
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
        setError(true);
        console.log(error);
    }

    const tokenSetter = async (data) => {
        try{
           await AsyncStorage.setItem("authorization", data);
        } catch (err){
            console.log("these was an error setting async storage", err.message)
        }
    }
    /**
     * @author Manik Bagga, Chris Bautista
     * @description Attempts logging in to the server
     */
    async function logInHandler(){

        setLoading(true);
        let tokenIn
        await axios.post(`${MONITOR_URL}/api/user/authorise`,
            {
                "username":email,
                "password":password,
            }
    ).then(res => {
            /*AsyncStorage.setItem('Authorization', "testc");
            console.log("The token is: ", res.data.token);
            console.log("asyncstorage in the then block of response", AsyncStorage.getItem("Authorization"))*/
            if(res.data.token) {
                tokenIn = res.data.token;
            }
            tokenSetter(res.data.token)

        }).catch((error)=>{
            console.log("Interceptor error: ", error.message)
            alert(JSON.stringify(error))
        })


        let token;
        /*await AsyncStorage.getItem('Authorization').then((res)=>{
            token = res;
            console.log("The token stored is: ", AsyncStorage.getItem('Authorization'));
        });*/
        try {
            token = await AsyncStorage.getItem("authorization")
            if(token !== null) console.log("tokenAuthInput", token)
        } catch (error){
            console.log("these was an error getting async storage", error.message)
        }
        try {
            changeEmailHandler(email);
            let data;
            let user

            let resp = await axios.post(`${MONITOR_URL}/api/login`, {
                deviceToken: expoPushToken,
                deviceType: "mobile",
                email: email,
                password: password})
                .then(response => {
                    data = response.data;
                    setLoading(false);
                    user = {
                        id: data.userId,
                        email: data.userEmail,
                        firstName: data.userFirstName,
                        lastName: data.userLastName
                    }
                    //console.log ("Data response", response)
                })
                .catch(response => {
                    setError(true);
                    console.log ("Catch response: ", response)
                })
            //console.log("This is data outside the function", data)
            //console.log("This is user outside the function", user)

            await setUserInfo(user);
            await setUserRoles(data.assignedRoles);
            await setUserOrganisation(data.organisations[0]);
            await setDirector(data.directorData);
            await setInactiveJobs(data.inactiveJobs);;
            await setActiveJobs(data.activeJobs);
            await setSubordinates(data.subordinates);
            await setLoggedIn(true)
            setError(false)
            props.nav.navigate("App")
        }

        catch(e){
            setError(true)
            errorHandling(e)
        }
    }

    /**
     * @author Manik Bagga, Chris Bautista
     * @description Displays the form components for logging in
     */
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

/**
 * @author Expo
 * @description These functions handle token registration, and send and fetch of notifications
 */
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
