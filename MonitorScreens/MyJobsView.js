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
