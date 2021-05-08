import React, {useEffect, useState, useContext} from "react";
import {
    ScrollView,
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableNativeFeedback,
    Alert, Platform
} from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

const { width } = Dimensions.get("screen");

import styles from "../constants/ScreenTheme";
import {LogInContext} from "../context/LogInContext";
import axios from 'axios';
import {updateUser} from "../Services/Auth";
import {MONITOR_URL} from "../constants/MonitorConstants";

const UpdatePersonalDetails = props => {
    // const userId = 1;
    const {userInfo, setUserInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const userId = userInfo.id;

    const firstNameString = userInfo.firstName.toString();
    const lastNameString = userInfo.lastName.toString();
    const emailString = userInfo.email.toString();

    const [firstName, setFirstName] = useState(firstNameString);
    const [lastName, setLastName] = useState(lastNameString);
    const [email, setEmail] = useState(emailString);
    const [emailValid, setEmailValid] = useState(true);
    const [errorState, setError] = useState(true);
    const [errorText, setErrorText] = useState("");
    const [password, setPassword] = useState("");

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

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

    async function handleUpdate(){
        try {
            changeEmailHandler(email);

            const data = {
                "userId":userInfo.id,
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "password":password,
            }
            // if(profileNewPasswordState === "has-success" && profileConfirmNewPasswordState === "has-success" && profileNewPassword !== ""){
            //     console.log("newPassword added to profile put request");
            //     data.newPassword = profileNewPassword;
            // }
            const response = await axios.put(`${MONITOR_URL}/api/user/update`, data)
                .then (response => {
                    const user = {
                        id: response.data.userId,
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName
                    }
                    setUserInfo(user);
                    alert("Details succesfully changed!");
                    props.navigation.pop();
                })
                .catch (err => {
                    alert("Invalid details! Please check all fields!")
                })
            return response;

        } catch (err) {
            // console.log("error in handleUpdate", JSON.stringify(err));
            //warningWithConfirmMessage(err.response.data.userEmail);//userEmail exception on client side does not mean exclusively email errors
            //return err;
            console.log("Error caught in main loop: ", err)
        }
    }

    return (
        <Block style={styles.group}>
            <Text style={styles.title}>Update Personal Details</Text>
            <Block safe>
                {emailValid ? null : <Text color="red"> Please Enter Valid Email </Text>}
                {errorState ? <Text color="red" >{errorText}</Text> : null}
                <Text style={styles.heading}>First Name</Text>
                <Input right
                       onChangeText={text =>
                           setFirstName(text)}
                       iconContent={<Block />}>
                    {firstNameString}
                </Input>
                <Text style={styles.heading}>Last Name</Text>
                <Input right
                       onChangeText={text =>
                           setLastName(text)}
                       iconContent={<Block />}>
                    {lastNameString}
                </Input>
                <Text style={styles.heading}>E-mail Address</Text>
                <Input right
                       onChangeText={text =>
                           setEmail(text)}
                       iconContent={<Block />}>
                    {emailString}
                </Input>
                <Text style={styles.heading}>Current Password</Text>
                <Input rounded
                       password
                       viewPass
                       onChangeText={changePasswordHandler}
                       value={password}
                />
                <Block middle>
                    <TouchableCmp style={{ flex: 1 }}>
                        <Button
                            onPress={handleUpdate}
                        >SAVE DETAILS</Button>
                    </TouchableCmp>
                </Block>
            </Block>
        </Block>
    );
}

export default UpdatePersonalDetails;
