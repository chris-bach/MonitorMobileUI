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
                equipmentId={equipmentData.item.equipmentId}
                equipmentName={equipmentData.item.equipmentName}
                manufacturer={equipmentData.item.manufacturer}
                model={equipmentData.item.model}
                currentState={equipmentData.item.currency}
                flags={equipmentData.item.flags}
                ipAddress={equipmentData.item.ipAddress}
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
                <Text>{jobName}</Text>
                <Text>{address}</Text>
                <Text>{jobId}</Text>
                <Text>{jobIdentifier}</Text>
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

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
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

export default ViewJobEquipment;
