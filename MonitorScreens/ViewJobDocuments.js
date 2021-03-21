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

import axios from "axios";
import {getDocumentsByOrganisationId} from "../Services/DocumentService";
import Document from "../models/Document";
import {getJobListByDepartment} from "../Services/DepartmentService";
import {getJobsByUserId} from "../Services/JobService";
import ViewJobsTile from "../components/ViewJobsTile";
import {getJobsDetailsByJobId} from "../Services/JobService";
import ViewEquipmentDetailsTile from "../components/ViewEquipmentDetailsTile";
import ViewDocumentsTile from "../components/ViewDocumentsTile";

const { width } = Dimensions.get("screen");

const ViewJobDocuments = props => {

    const [jobDetails, setJobDetails] = useState([]);
    const [documentDetails, setDocumentDetails] = useState([]);
    const [dataDocuments, setDataDocuments] = useState([]);

    const jobIdentifier = props.route.params.params.jobIdentifier;
    const jobId = props.route.params.params.jobId;
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
                    const documentList = []
                    response.data.jobDocuments.forEach(object => {
                        documentList.push(object)
                        // setIsLoading(true)
                        // console.log(object)
                    })
                    setDocumentDetails(documentList);
                    alert('Equipment details got!');
                    console.log(documentList);
                }).catch(error => {
                console.log(error)
                alert('Equipment details NOT got!');
            })
        },
        []);

    useEffect(() => {
        const tableData = [];
        documentDetails.forEach((doc, key) => {
            let documentInfo = {
                id: key,
                description: doc.description,
                documentId: doc.documentId,
                name: doc.name,
                parentInfo: doc.parentInfo,
            };
            tableData.push(documentInfo);
        })
        setDataDocuments(tableData);
        alert('Job details pushed!');
    }, [documentDetails]);

    const renderDocuments = dataDocuments => {
        return (
            <ViewDocumentsTile
                description={dataDocuments.item.description}
                documentId={dataDocuments.item.documentId}
                name={dataDocuments.item.name}
                parentInfo={dataDocuments.item.parentInfo}
                onSelect={() => {
                    props.navigation.navigate('View PDF',
                        {
                            params: {
                                // jobIdentifier: itemData.item.jobIdentifier,
                                // address: itemData.item.address,
                                // job_id: itemData.item.id
                            }
                        });
                    alert("You clicked " + dataDocuments.item.description + " document!" )
                }}
            />
        );
    };

    // const renderItem = itemData => {
    //     return (
    //         <TouchableCmp style={{ flex: 1 }}
    //               onPress={() => {
    //                   alert("You clicked " + itemData.item.description + " document!" )
    //               }}
    //         >
    //             <View
    //                 style={styles.group}
    //             >
    //                 <Text style={styles.title} numberOfLines={2}>
    //                     {itemData.item.documentName}
    //                 </Text>
    //                 <Text style={styles.title} numberOfLines={2}>
    //                     {itemData.item.description}
    //                 </Text>
    //             </View>
    //         </TouchableCmp>
    //     );
    // };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text>{address}</Text>
                <Text>{jobId}</Text>
                <Text>{jobIdentifier}</Text>
                <FlatList
                    keyExtractor={(item, index) => item.id} //Need to check which key!!!
                    data={dataDocuments}
                    renderItem={renderDocuments}
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

export default ViewJobDocuments;
