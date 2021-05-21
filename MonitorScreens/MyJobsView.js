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

/**
 * @author Chris Bautista
 * @description This component gets the jobs data from the server and renders the flatlist using ViewJobsTile
 */
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

    /**
     * @author Matt Belgre, Chris Bautista
     * @description The following useEffects get the jobs of the currently logged in user from the server
     * and then pushes into state rendered by the flatlist
     */
    useEffect(() => {
            getJobsByUserId(userId)
                .then((response) => {
                    const jobList = []
                    response.data.forEach(object => {
                        jobList.push(object)
                        // setIsLoading(true)
                    })
                    setJobList(jobList);
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
                start: JSON.stringify(job.start[2]).concat("/", JSON.stringify(job.start[1])).concat("/", JSON.stringify(job.start[0])),
                end: JSON.stringify(job.end[2]).concat("/", JSON.stringify(job.end[1])).concat("/", JSON.stringify(job.end[0])),
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

    /**
     * @author Chris Bautista
     * @description Renders the jobs flatlist styled by ViewJobsTile
     */
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

    /**
     * @author Chris Bautista
     * @description Renders the jobs using the renderItem function above
     */
    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>My Jobs</Text>
                <FlatList
                    keyExtractor={(item, index) => item.id.toString()}  //Need to check which key!!!
                    data={data}
                    renderItem={renderItem}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default MyJobsView;
