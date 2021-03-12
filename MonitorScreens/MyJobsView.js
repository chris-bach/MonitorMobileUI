import React, {useState, useEffect}from "react";
import {
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

import axios from 'axios';

const { width } = Dimensions.get("screen");

const MyJobsView = () => {
    const [docName, setDocName] = useState('TestDoc2')
    const [organisationID, setOrganisationID] = useState({entry: '1'})
    const [userID, setUserID] = useState({entry: '2'})
    const [password, setPassword] = useState({entry: 'password'})

    function download(){
        alert("Docname: " + docName + ", OrganisationID: " + organisationID.entry + ", UserID: " + userID.entry + ", Password: " + password.entry);
        axios({
            url: `http://localhost:8080/api/document/getByName/value=${docName}/value=${organisationID.entry}/value=${userID.entry}/value=${password.entry}`, //your url
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <Block flex style={styles.group}>
            <Text size={16} style={styles.title}>
                Test File Download
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                    right
                    placeholder="Enter Document Name"
                    // onChange={(event) =>
                    //     setDocName({entry:event.target.value})}
                    onChangeText={text =>
                        setDocName(text)}
                    value = {docName.entry}
                    style={{
                        borderColor: argonTheme.COLORS.INFO,
                        borderRadius: 4,
                        backgroundColor: "#fff"
                    }}
                    iconContent={<Block />}
                />
                <Input
                    right
                    placeholder="Enter OrganisationID"
                    onChange={(event) =>
                        setOrganisationID({entry:event.target.value})}
                    value = {organisationID.entry}
                    style={{
                        borderColor: argonTheme.COLORS.INFO,
                        borderRadius: 4,
                        backgroundColor: "#fff"
                    }}
                    iconContent={<Block />}
                />
                <Input
                    right
                    placeholder="Enter UserID"
                    onChange={(event) =>
                        setUserID({entry:event.target.value})}
                    value = {userID.entry}
                    style={{
                        borderColor: argonTheme.COLORS.INFO,
                        borderRadius: 4,
                        backgroundColor: "#fff"
                    }}
                    iconContent={<Block />}
                />
                <Input
                    right
                    placeholder="{Password}"
                    onChange={(event) =>
                        setPassword({entry:event.target.value})}
                    value = {password.entry}
                    style={{
                        borderColor: argonTheme.COLORS.INFO,
                        borderRadius: 4,
                        backgroundColor: "#fff"
                    }}
                    iconContent={<Block />}
                />
                <TouchableOpacity>
                    <Button color="info" onPress={download}>Download!!!</Button>
                </TouchableOpacity>
            </Block>

        </Block>
    );

}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 44,
        color: argonTheme.COLORS.HEADER
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2
    },
    button: {
        marginBottom: theme.SIZES.BASE,
        width: width - theme.SIZES.BASE * 2
    },
    optionsButton: {
        width: "auto",
        height: 34,
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: 10
    },
    input: {
        borderBottomWidth: 1
    },
    inputDefault: {
        borderBottomColor: argonTheme.COLORS.PLACEHOLDER
    },
    inputTheme: {
        borderBottomColor: argonTheme.COLORS.PRIMARY
    },
    inputInfo: {
        borderBottomColor: argonTheme.COLORS.INFO
    },
    inputSuccess: {
        borderBottomColor: argonTheme.COLORS.SUCCESS
    },
    inputWarning: {
        borderBottomColor: argonTheme.COLORS.WARNING
    },
    inputDanger: {
        borderBottomColor: argonTheme.COLORS.ERROR
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: "center"
    }
});

export default MyJobsView;