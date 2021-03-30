import React, {useEffect, useState} from "react";
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

const MyJobDetailsView = props => {

    const jobIdentifier = props.route.params.params.jobIdentifier;
    const jobId = props.route.params.params.jobId;
    const jobName = props.route.params.params.jobName;
    const address = props.route.params.params.address;

    const userId = 1;

    console.log(props);

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    return (
        <Block style={styles.group}>
                <Text style={styles.title}>{jobName}</Text>
                <Text style={styles.heading}>{address}</Text>
                {/*<Text style={styles.normal}>Job Id: {jobId}</Text>*/}
                {/*<Text style={styles.normal}>Job Identifier: {jobIdentifier}</Text>*/}
                <Button
                    onPress={() => {
                        alert("You clicked this button!" )
                        props.navigation.navigate('View Job Equipment',
                            {
                                params: {
                                    jobIdentifier: jobIdentifier,
                                    address: address,
                                    jobId: jobId,
                                    jobName: jobName
                                }
                            });

                    }}
                >VIEW EQUIPMENT</Button>

                <Button
                    onPress={() => {
                    alert("You clicked this view job documents button!" )
                    props.navigation.navigate('View Job Documents',
                        {
                            params: {
                                jobIdentifier: jobIdentifier,
                                address: address,
                                jobId: jobId,
                                jobName: jobName
                            }
                        });
                }}>VIEW JOB DOCUMENTS</Button>
        </Block>
    );
}

export default MyJobDetailsView;
