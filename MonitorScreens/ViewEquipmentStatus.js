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

import ViewBreakdownsTile from "../components/ViewBreakdownsTile";
import {getAllByEquipmentMonitorId} from "../Services/EquipmentService";
import axios from 'axios';

const ViewEquipmentStatus = props => {

    console.log("Props", props);
    const [breakdownDetails, setBreakdownDetails] = useState([]);
    const [dataBreakdown, setDataBreakdown] = useState([]);

    const monitorName = props.route.params.params.monitorName;
    const equipmentMonitorId = props.route.params.params.equipmentMonitorId;
    const equipmentName = props.route.params.params.equipmentName;
    const description = props.route.params.params.description;
    const equipmentId = props.route.params.params.equipmentId;
    const currentState = props.route.params.params.currentState;

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    useEffect(() => {
            getAllByEquipmentMonitorId(equipmentMonitorId)
                .then((response) => {
                    const breakdownList = []
                    response.data.forEach(object => {
                        breakdownList.push(object)
                        // setIsLoading(true)
                        console.log("Object", object)
                    })
                    setBreakdownDetails(breakdownList);
                    console.log("Response Data", response);
                }).catch(error => {
                console.log("ResponseERR", response);
                console.log(error)
                alert('Breakdown details NOT got!');
            })
        },
        []);

    useEffect(() => {
        const tableData = [];
        breakdownDetails.forEach((br, key) => {
            let breakdownInfo = {
                id: key,
                breakdownId: br.breakdownId,
                faultCode: br.faultCode,
                recentState: br.recentState,
                faultCause: br.faultCause,
                breakdownTime: br.breakdownTime,
            };
            tableData.push(breakdownInfo);
        })
        setDataBreakdown(tableData);
        console.log("Data breakdown", dataBreakdown)
        alert('Breakdown details pushed!');
    }, [breakdownDetails]);

    const renderBreakdowns = breakdownData => {
        return (
            <ViewBreakdownsTile
                breakdownId={breakdownData.item.breakdownId}
                breakdownTime={breakdownData.item.breakdownTime}
                faultCause={breakdownData.item.faultCause}
                faultCode={breakdownData.item.faultCode}
                recentState={breakdownData.item.recentState}
                onSelect={() => {
                    // props.navigation.navigate({
                    //     routeName: 'CategoryMeals',
                    //     params: {
                    //         docId: itemData.item.id
                    //     }
                    // });
                    alert("You clicked a breakdown id: " + breakdownData.item.breakdownId)
                }}
            />
        );
    };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>{monitorName}</Text>
                <Text style={styles.heading}>{description}</Text>
                <Text style={styles.heading}>Current State: {currentState}</Text>
                <Block middle style={{ marginTop: 15, marginBottom: 15 }}>
                    <Block style={styles.divider} />
                </Block>
                <Text style={styles.title}>Recent Breakdowns: </Text>
                <FlatList
                    keyExtractor={(item, index) => item.id} //Need to check which key!!!
                    data={dataBreakdown}
                    renderItem={renderBreakdowns}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default ViewEquipmentStatus;
