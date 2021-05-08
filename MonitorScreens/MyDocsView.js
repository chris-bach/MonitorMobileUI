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

import {getDocumentsByOrganisationId} from "../Services/DocumentService";
import ViewDocumentsTile from "../components/ViewDocumentsTile";

const MyDocsView = props => {
    // const organisationId = 1;
    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const organisationId = userOrganisation.organisationId;

    const [docList, setDocList] = useState([]);
    const [docsData, setData] = useState([]);

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    useEffect(() => {
            getDocumentsByOrganisationId(organisationId)
                .then((response) => {
                    const docs = []
                    response.data.forEach(object => {
                        docs.push(object)
                        // setIsLoading(true)
                    })
                    setDocList(docs);
                    console.log(response);
                }).catch(error => {
                console.log(error);
            })
        },
        []);

    useEffect(() => {
        const tableData = [];
        docList.forEach((docs, index) => {
            let users = {
                id: index,
                documentName: docs.name,
                description: docs.description,
                documentId: docs.documentId,
                parentInfo: docs.parentInfo,
                actions: (
                    <div className="actions-right">
                        <Input type="checkbox" id={index} value={index}/>
                    </div>
                ),
            }
            tableData.push(users);
        })
        setData(tableData);
    }, [docList]);

    const renderItem = itemData => {
        return (
            <ViewDocumentsTile
                name={itemData.item.documentName}
                description={itemData.item.description}
                documentId={itemData.item.documentId}
                parentInfo={itemData.item.parentInfo}
                onSelect={() => {
                    props.navigation.navigate('View PDF',
                        {
                            params: {
                                // jobIdentifier: itemData.item.jobIdentifier,
                                // address: itemData.item.address,
                                // job_id: itemData.item.id
                            }
                        });
                }}
            />
        );
    };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <FlatList
                    keyExtractor={(item, index) => item.id.toString()}  //Need to check which key!!!
                    data={docsData}
                    renderItem={renderItem}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default MyDocsView;
