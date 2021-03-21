import React, {useEffect, useState} from "react";
import {
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity, Platform, TouchableNativeFeedback, Linking
} from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

import ViewDocumentsTile from "../components/ViewDocumentsTile";

import axios from "axios";
import {add} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const Scratchpad = () => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);
    const [address, setAddress] = useState({entry: '50 Park St, Sydney, NSW 2000'})

    var position = window.navigator.geolocation.getCurrentPosition(
        (position) => {
            setLatitude(position.coords.latitude);
            //can only use "setState" to change state
            setLongitude(position.coords.longitude)
            // alert("Latitude is: " + latitude + " Longitude is: " + longitude)
        },
        (err) => {
            alert(err.message);
        }
    )

    const geo = () => {
        alert (address);
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${address}`)
    }

    const pdf = () => {
        axios({
            url: `http://192.168.56.1:8080/api/document/test`, //your url
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
        <Block flex center>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30, width }}
            >
                <Text>Longitude: {longitude}</Text>
                <Text>Latitude: {latitude}</Text>
                <Text>{address.entry}</Text>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Input Address Here"
                           onChangeText={text =>
                               setAddress(text)}
                           iconContent={<Block />} />
                </Block>
                <Button color="info" onPress={geo}>Geo!!!</Button>
                <Button color="info" onPress={pdf}>PDF!!!</Button>
            </ScrollView>
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

export default Scratchpad;
