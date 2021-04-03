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

const UpdatePersonalDetails = props => {
    // const userId = 1;
    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const userId = userInfo.id;

    const firstNameString = userInfo.firstName.toString();
    const lastNameString = userInfo.lastName.toString();
    const emailString = userInfo.email.toString();

    const [firstName, setFirstName] = useState(firstNameString);
    const [lastName, setLastName] = useState(lastNameString);
    const [email, setEmail] = useState(emailString);
    const [password, setPassword] = useState("password");

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    async function handleUpdate(){
        try {
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
            console.log("handleUpdate data, ", data);
            const response = await axios.put("http://192.168.20.13:8080/api/user/update", data)
                .then(response => console.log("res", response))
                .catch (err => console.log ("err", err))
            let myResponse = await response.data;

            if(myResponse.userId === undefined) {
                warningWithConfirmMessage("Invalid profile details, please try again.");
            } else {
                successAlertModal();
            }
            return response;
        } catch (err) {
            // console.log("error in handleUpdate", JSON.stringify(err));
            //warningWithConfirmMessage(err.response.data.userEmail);//userEmail exception on client side does not mean exclusively email errors
            //return err;
            console.log("error", err)
        }
    }

    return (
        <Block style={styles.group}>
            <Text style={styles.title}>Update Personal Details</Text>
            <Block>
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
                <Text style={styles.heading}>Password</Text>
                <Input right
                       onChangeText={text =>
                           setPassword(text)}
                       iconContent={<Block />}>
                    {password}
                </Input>
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
