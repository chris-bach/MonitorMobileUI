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

import {getJobsDetailsByJobId} from "../Services/JobService";
import ViewDocumentsTile from "../components/ViewDocumentsTile";

const { width } = Dimensions.get("screen");

import styles from "../constants/ScreenTheme";
import {LogInContext} from "../context/LogInContext";

/**
 * @author Chris Bautista
 * @description This component is unused as we removed the view documents function.
 * It was meant to show the user the list of job documents, similar to ViewJobEquipment
 */

const ViewJobDocuments = props => {
    // const userId = 1;
    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const userId = userInfo.id;

    const [documentDetails, setDocumentDetails] = useState([]);
    const [dataDocuments, setDataDocuments] = useState([]);

    const jobIdentifier = props.route.params.params.jobIdentifier;
    const jobId = props.route.params.params.jobId;
    const address = props.route.params.params.address;
    const jobName = props.route.params.params.jobName;

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

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
                }).catch(error => {
                console.log(error)
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
                    //alert("You clicked " + dataDocuments.item.description + " document!" )
                }}
            />
        );
    };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>{jobName}</Text>
                <Text style={styles.heading}>{address}</Text>
                <FlatList
                    keyExtractor={(item, index) => item.id.toString()} //Need to check which key!!!
                    data={dataDocuments}
                    renderItem={renderDocuments}
                    numColumns={1}
                />

            </Block>
        </Block>
    );
}

export default ViewJobDocuments;
