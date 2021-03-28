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

import {getJobsByUserId} from "../Services/JobService";
import ViewJobsTile from "../components/ViewJobsTile";

import styles from "../constants/ScreenTheme";

const { width } = Dimensions.get("screen");

const MyJobsView = props => {

    const [jobList, setJobList] = useState([]);
    const [data, setData] = useState([]);

    const userId = 1;

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
            getJobsByUserId(userId)
                .then((response) => {
                    const jobList = []
                    response.data.forEach(object => {
                        jobList.push(object)
                        // setIsLoading(true)
                    })
                    setJobList(jobList);
                    console.log(response)
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
                jobId:job.jobId,
                jobName:job.jobName,
                address: job.address,
                start: job.start,
                end: job.end,
                jobIdentifier: job.jobIdentifier,
                latitude: job.latitude,
                longitude: job.longitude,
            };
            tableData.push(jobInfo);
        })
        setData(tableData);
        alert('Jobs pushed!');
    }, [jobList]);

    const renderItem = itemData => {
        return (
            <ViewJobsTile
                jobName={itemData.item.jobName}
                address={itemData.item.address}
                startDate={itemData.item.start}
                endDate={itemData.item.end}
                latitude={itemData.item.latitude}
                longitude={itemData.item.longitude}
                jobId={itemData.item.jobId}
                jobIdentifier={itemData.item.jobIdentifier}
                onSelect={() => {
                    props.navigation.navigate('Job Details',
                        {
                            params: {
                                jobIdentifier: itemData.item.jobIdentifier,
                                address: itemData.item.address,
                                jobId: itemData.item.jobId,
                                jobName: itemData.item.jobName
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
                    keyExtractor={(item, index) => item.id}  //Need to check which key!!!
                    data={data}
                    renderItem={renderItem}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default MyJobsView;
