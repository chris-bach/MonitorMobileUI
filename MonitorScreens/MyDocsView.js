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

import {getDocumentsByOrganisationId} from "../Services/DocumentService";
import ViewDocumentsTile from "../components/ViewDocumentsTile";

const { width } = Dimensions.get("screen");

import styles from "../constants/ScreenTheme";

const MyDocsView = props => {

    const [docList, setDocList] = useState([]);
    const [docsData, setData] = useState([]);

    const organisationId = 1;

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    function alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    const element = (data, index) => (
        <TouchableOpacity onPress={() => alertIndex(index)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );


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
                alert("Data error!");
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
                        // alert("You clicked " + itemData.item.description + " document!" )
                    }}
                />
            );
        };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <FlatList
                    keyExtractor={(item, index) => item.id}  //Need to check which key!!!
                    data={docsData}
                    renderItem={renderItem}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default MyDocsView;
