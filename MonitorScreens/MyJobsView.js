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
import ViewJobsTile from "../components/ViewJobsTile";

const { width } = Dimensions.get("screen");

const MyJobsView = () => {

    const [jobList, setJobList] = useState([]);

    const [data, setData] = useState([]);

    const departmentId = 2;


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
            getJobListByDepartment(departmentId)
                .then((response) => {
                    const jobList = []
                    response.data.forEach(object => {
                        jobList.push(object)
                        // setIsLoading(true)
                    })
                    setJobList(jobList);
                    alert('Jobs got!');
                }).catch(error => {
                console.log(error)
                alert('Jobs NOT got!');
            })
        },
        []);

    useEffect(() => {
        const tableData = [];
        jobList.forEach((job, key) => {
            let jobInfo = {
                id: key,
                address: job.address,
                startDate: job.contractStartDate,
                endDate: job.contractEndDate,
                jobNumber: job.jobIdentifier,
            };
            tableData.push(jobInfo);
        })
        setData(tableData);
        alert('Jobs pushed!');
    }, [jobList]);

    const renderGridItem = itemData => {
        return (
            <ViewJobsTile
                address={itemData.item.address}
                startDate={itemData.item.startDate}
                endDate={itemData.item.endDate}
                onSelect={() => {
                    // props.navigation.navigate({
                    //     routeName: 'CategoryMeals',
                    //     params: {
                    //         docId: itemData.item.id
                    //     }
                    // });
                    alert("You clicked the job at " + itemData.item.address + "!" )
                }}
            />
        );
    };

    // const renderGridItem = itemData => {
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
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={data}
                    renderItem={renderGridItem}
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

export default MyJobsView;
