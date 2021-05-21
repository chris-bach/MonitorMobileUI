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

import axios from "axios";

/**
 * @author Chris Bautista
 * @description This isn't included in the build but is just an extra component Chris uses to draft components.
 */
const { width } = Dimensions.get("screen");

import styles from "../constants/ScreenTheme";

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
            url: `http://192.168.20.13:8080/api/document/test`, //your url
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

export default Scratchpad;
