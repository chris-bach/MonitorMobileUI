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

import {getJobsDetailsByJobId} from "../Services/JobService";
import ViewEquipmentDetailsTile from "../components/ViewEquipmentDetailsTile";

/**
 * @author Chris Bautista
 * @description This component gets the equipment data from the server and renders the flatlist using ViewEquipmentDetailsTile
 */
const ViewJobEquipment = props => {
    // const userId = 1;

    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const userId = userInfo.id;

    const [equipmentDetails, setEquipmentDetails] = useState([]);
    const [dataEquipment, setDataEquipment] = useState([]);

    const jobIdentifier = props.route.params.params.jobIdentifier;
    const jobId = props.route.params.params.jobId;
    const jobName = props.route.params.params.jobName;
    const address = props.route.params.params.address;

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    /**
     * @author Matt Belgre, Chris Bautista
     * @description The following useEffects get the equipment details of the currently logged in user's job from the server
     * and then pushes into state rendered by the flatlist
     */
    useEffect(() => {
            getJobsDetailsByJobId(jobId,userId)
                .then((response) => {
                    const equipmentList = []
                    response.data.equipmentDetails.forEach(object => {
                        equipmentList.push(object)
                    })
                    setEquipmentDetails(equipmentList);
                }).catch(error => {
                console.log("useEffect catch: ", error)
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
                monitorName: eq.equipmentMonitor.monitorName,
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
    }, [equipmentDetails]);

    /**
     * @author Chris Bautista
     * @description Renders the jobs flatlist styled by ViewEquipmentDetailsTile
     */
    const renderEquipment = equipmentData => {
        return (
            <ViewEquipmentDetailsTile
                monitorName={equipmentData.item.monitorName}
                equipmentMonitorId={equipmentData.item.equipmentMonitorId}
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
                    props.navigation.navigate('View Equipment Status',
                        {
                            params: {
                                monitorName: equipmentData.item.monitorName,
                                equipmentMonitorId: equipmentData.item.equipmentMonitorId,
                                equipmentName: equipmentData.item.equipmentName,
                                description: equipmentData.item.description,
                                equipmentId: equipmentData.item.equipmentId,
                                currentState: equipmentData.item.currentState,
                            }
                        });

                }}
            />
        );
    };

    /**
     * @author Chris Bautista
     * @description Renders the job's equipment list using the renderEquipment function above
     */
    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>{jobName}</Text>
                <Text style={styles.heading}>{address}</Text>
                {/*<Text>{jobId}</Text>*/}
                {/*<Text>{jobIdentifier}</Text>*/}
                <FlatList
                    keyExtractor={(item, index) => item.id.toString()} //Need to check which key!!!
                    data={dataEquipment}
                    renderItem={renderEquipment}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default ViewJobEquipment;
