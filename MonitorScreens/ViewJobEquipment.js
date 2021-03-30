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

import {getJobsDetailsByJobId} from "../Services/JobService";
import ViewEquipmentDetailsTile from "../components/ViewEquipmentDetailsTile";

const { width } = Dimensions.get("screen");

import styles from "../constants/ScreenTheme";

const ViewJobEquipment = props => {

    const [jobDetails, setJobDetails] = useState([]);
    const [equipmentDetails, setEquipmentDetails] = useState([]);
    const [dataEquipment, setDataEquipment] = useState([]);

    const jobIdentifier = props.route.params.params.jobIdentifier;
    const jobId = props.route.params.params.jobId;
    const jobName = props.route.params.params.jobName;
    const address = props.route.params.params.address;

    const userId = 1;

    // console.log(props);

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

    useEffect(() => {
            getJobsDetailsByJobId(jobId,userId)
                .then((response) => {
                    const equipmentList = []
                    response.data.equipmentDetails.forEach(object => {
                        equipmentList.push(object)
                        // setIsLoading(true)
                        // console.log(object)
                    })
                    setEquipmentDetails(equipmentList);
                    console.log(response.data);
                }).catch(error => {
                console.log(error)
                alert('Equipment details NOT got!');
            })
        },
        []);

    useEffect(() => {
        const tableData = [];
        equipmentDetails.forEach((eq, key) => {
            let equipmentInfo = {
                id: key,
                description: eq.equipment.description,
                equipmentId: eq.equipment.equipmentId,
                equipmentName: eq.equipment.equipmentName,
                manufacturer: eq.equipment.manufacturer,
                model: eq.equipment.model,
                documents: eq.equipmentDocuments,
                currentState: eq.equipmentMonitor.currentState,
                equipmentMonitorId: eq.equipmentMonitor.equipmentMonitorId,
                flags: eq.equipmentMonitor.flags,
                ipAddress: eq.equipmentMonitor.ipAddress,
                status: eq.equipmentMonitor.status,
                breakdowns: eq.equipmentMonitor.breakdowns
                // end: job.end,
                // jobIdentifier: job.jobIdentifier,
            };
            tableData.push(equipmentInfo);
        })
        setDataEquipment(tableData);
        alert('Equipment details pushed!');
    }, [equipmentDetails]);

    const renderEquipment = equipmentData => {
        return (
            <ViewEquipmentDetailsTile
                description={equipmentData.item.description}
                // equipmentId={equipmentData.item.equipmentId}
                equipmentName={equipmentData.item.equipmentName}
                manufacturer={equipmentData.item.manufacturer}
                model={equipmentData.item.model}
                currentState={equipmentData.item.currency}
                // flags={equipmentData.item.flags}
                // ipAddress={equipmentData.item.ipAddress}
                status={equipmentData.item.status}
                breakdowns={equipmentData.item.breakdowns}
                onSelect={() => {
                    // props.navigation.navigate({
                    //     routeName: 'CategoryMeals',
                    //     params: {
                    //         docId: itemData.item.id
                    //     }
                    // });

                    console.log(equipmentData.item.breakdowns)
                }}
            />
        );
    };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>{jobName}</Text>
                <Text style={styles.heading}>{address}</Text>
                {/*<Text>{jobId}</Text>*/}
                {/*<Text>{jobIdentifier}</Text>*/}
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

export default ViewJobEquipment;
