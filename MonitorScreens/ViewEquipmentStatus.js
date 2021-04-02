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

import ViewEquipmentDetailsTile from "../components/ViewEquipmentDetailsTile";

const ViewEquipmentStatus = props => {

    const [jobDetails, setJobDetails] = useState([]);
    const [equipmentDetails, setEquipmentDetails] = useState([]);
    const [dataEquipment, setDataEquipment] = useState([]);

    const equipmentName = props.route.params.params.equipmentName;
    const description = props.route.params.params.description;
    const equipmentId = props.route.params.params.equipmentId;
    const currentState = props.route.params.params.currentState;

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    // function alertIndex(index) {
    //     Alert.alert(`This is row ${index + 1}`);
    // }
    //
    // const element = (data, index) => (
    //     <TouchableOpacity onPress={() => alertIndex(index)}>
    //         <View style={styles.btn}>
    //             <Text style={styles.btnText}>button</Text>
    //         </View>
    //     </TouchableOpacity>
    // );

    // useEffect(() => {
    //         getJobsDetailsByJobId(jobId,userId)
    //             .then((response) => {
    //                 const equipmentList = []
    //                 response.data.equipmentDetails.forEach(object => {
    //                     equipmentList.push(object)
    //                     // setIsLoading(true)
    //                     // console.log(object)
    //                 })
    //                 setEquipmentDetails(equipmentList);
    //                 console.log(response.data);
    //             }).catch(error => {
    //             console.log(error)
    //             alert('Equipment details NOT got!');
    //         })
    //     },
    //     []);
    //
    // useEffect(() => {
    //     const tableData = [];
    //     equipmentDetails.forEach((eq, key) => {
    //         let equipmentInfo = {
    //             id: key,
    //             description: eq.equipment.description,
    //             equipmentId: eq.equipment.equipmentId,
    //             equipmentName: eq.equipment.equipmentName,
    //             manufacturer: eq.equipment.manufacturer,
    //             model: eq.equipment.model,
    //             documents: eq.equipmentDocuments,
    //             currentState: eq.equipmentMonitor.currentState,
    //             equipmentMonitorId: eq.equipmentMonitor.equipmentMonitorId,
    //             flags: eq.equipmentMonitor.flags,
    //             ipAddress: eq.equipmentMonitor.ipAddress,
    //             status: eq.equipmentMonitor.status.toString(),
    //             breakdowns: eq.equipmentMonitor.breakdowns
    //             // end: job.end,
    //             // jobIdentifier: job.jobIdentifier,
    //         };
    //         tableData.push(equipmentInfo);
    //     })
    //     setDataEquipment(tableData);
    //     alert('Equipment details pushed!');
    // }, [equipmentDetails]);

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
                <FlatList
                    keyExtractor={(item, index) => item.id} //Need to check which key!!!
                    data={dataEquipment}
                    renderItem={renderEquipment}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default ViewEquipmentStatus;
