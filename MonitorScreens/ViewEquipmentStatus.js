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
import {getAllByEquipmentId} from "../Services/EquipmentService";
import axios from 'axios';

const ViewEquipmentStatus = props => {

    console.log("Props", props);
    const [breakdownDetails, setBreakdownDetails] = useState([]);
    const [dataBreakdown, setDataBreakdown] = useState([]);

    const equipmentName = props.route.params.params.equipmentName;
    const description = props.route.params.params.description;
    const equipmentId = props.route.params.params.equipmentId;
    const currentState = props.route.params.params.currentState;

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    useEffect(() => {
            getAllByEquipmentId(equipmentId)
                .then((response) => {
                    const breakdownList = []
                    // response.data.forEach(object => {
                    //     breakdownList.push(object)
                    //     // setIsLoading(true)
                    //     console.log("Object", object)
                    // })
                    // setBreakdownDetails(breakdownList);
                    console.log("Response Data", response.data);
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
                breakdownID: br.breakdownID,
                faultCode: br.faultCode,
                recentState: br.recentState,
                faultCause: br.faultCause,
                breakdownTime: br.breakdownTime,
            };
            tableData.push(breakdownInfo);
        })
        setDataBreakdown(tableData);
        console.log("Use effect", dataBreakdown)
        alert('Breakdown details pushed!');
    }, [breakdownDetails]);

    const renderEquipment = equipmentData => {
        return (
            <ViewEquipmentDetailsTile
                description={equipmentData.item.description}
                // equipmentId={equipmentData.item.equipmentId}
                equipmentName={equipmentData.item.equipmentName}
                manufacturer={equipmentData.item.manufacturer}
                model={equipmentData.item.model}
                currentState={equipmentData.item.currentState}
                // flags={equipmentData.item.flags}
                // ipAddress={equipmentData.item.ipAddress}
                status={equipmentData.item.status}
                breakdowns={equipmentData.item.breakdowns}
                onSelect={() => {
                    // props.navigation.navigate('View Equipment Status',
                    //     {
                    //         params: {
                    //             jobIdentifier: itemData.item.jobIdentifier,
                    //             address: itemData.item.address,
                    //             jobId: itemData.item.jobId,
                    //             jobName: itemData.item.jobName
                    //         }
                    //     });

                }}
            />
        );
    };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>{equipmentName}</Text>
                <Text style={styles.heading}>{description}</Text>
                <Text style={styles.heading}>Current State: {currentState}</Text>
                {/*<FlatList*/}
                {/*    keyExtractor={(item, index) => item.id} //Need to check which key!!!*/}
                {/*    data={dataBreakdowns}*/}
                {/*    renderItem={renderBreakdowns}*/}
                {/*    numColumns={1}*/}
                {/*/>*/}
            </Block>
        </Block>
    );
}

export default ViewEquipmentStatus;
