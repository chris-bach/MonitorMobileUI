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

import {getJobsByUserId} from "../Services/JobService";
import ViewJobsTile from "../components/ViewJobsTile";

const MyJobsView = props => {
    // const userId = 1;
    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const userId = userInfo.id;

    const [jobList, setJobList] = useState([]);
    const [data, setData] = useState([]);

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

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
                firstName: job.manager.firstName,
                lastName: job.manager.lastName,
                email: job.manager.email,
            };
            tableData.push(jobInfo);
        })
        setData(tableData);
    }, [jobList]);

    const renderItem = itemData => {
        return (
            <ViewJobsTile
                jobName={itemData.item.jobName}
                address={itemData.item.address}
                firstName={itemData.item.firstName}
                lastName={itemData.item.lastName}
                email={itemData.item.email}
                startDate={itemData.item.start}
                endDate={itemData.item.end}
                latitude={itemData.item.latitude}
                longitude={itemData.item.longitude}
                jobId={itemData.item.jobId}
                jobIdentifier={itemData.item.jobIdentifier}
                // onSelect={() => {
                //     props.navigation.navigate('Job Details',
                //         {
                //             params: {
                //                 jobIdentifier: itemData.item.jobIdentifier,
                //                 address: itemData.item.address,
                //                 jobId: itemData.item.jobId,
                //                 jobName: itemData.item.jobName
                //             }
                //         });
                // }}
                onSelect={() => {
                    props.navigation.navigate('View Job Equipment',
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
                <Text style={styles.title}>My Jobs</Text>
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
