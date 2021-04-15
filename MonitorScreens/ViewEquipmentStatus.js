import React, {useEffect, useState} from "react";
import {
    Image,
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
import {Images, argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

const { width } = Dimensions.get("screen");

import styles from "../constants/ScreenTheme";

import ViewBreakdownsTile from "../components/ViewBreakdownsTile";
import {getAllByEquipmentMonitorId, getStatusById} from "../Services/EquipmentService";
import axios from 'axios';

const ViewEquipmentStatus = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    console.log("Props", props);
    const [breakdownDetails, setBreakdownDetails] = useState([]);
    const [dataBreakdown, setDataBreakdown] = useState([]);

    const monitorName = props.route.params.params.monitorName;
    const equipmentMonitorId = props.route.params.params.equipmentMonitorId;
    const equipmentName = props.route.params.params.equipmentName;
    const description = props.route.params.params.description;
    const equipmentId = props.route.params.params.equipmentId;
    const currentState = props.route.params.params.currentState;

    const [image, setImage] = useState();
    const [monitor, setMonitor] = useState();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
            getAllByEquipmentMonitorId(equipmentMonitorId)
                .then((response) => {
                    const breakdownList = []
                    response.data.forEach(object => {
                        breakdownList.push(object)
                        // setIsLoading(true)
                        console.log("Object", object)
                    })
                    setBreakdownDetails(breakdownList);
                    console.log("Response Data", response);
                }).catch(error => {
                console.log("ResponseERR", response);
                console.log(error)
                alert('Breakdown details NOT got!');
            })
        },
        []);

    useEffect(() => {
        const tableData = [];
        breakdownDetails.forEach((br, key) => {
            let breakdownInfo = {
                id: key,
                breakdownId: br.breakdownId,
                faultCode: br.faultCode,
                recentState: br.recentState,
                faultCause: br.faultCause,
                breakdownTime: br.breakdownTime,
            };
            tableData.push(breakdownInfo);
        })
        setDataBreakdown(tableData);
        console.log("Data breakdown", dataBreakdown)
        alert('Breakdown details pushed!');
    }, [breakdownDetails]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCounter(counter + 1);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [counter]);

    useEffect(() => {
        getStatusById(equipmentMonitorId)
            .then(res => {
                setMonitor(res.data);
                // if(res.data.flags === "PARKED"){
                //     setImage(getLiftState("PARKED"))
                // }else{
                //     setImage(getLiftState(res.data.currentState))
                // }
                setImage(getLiftState(res.data.currentState))
            })
    }, [counter])

    const getLiftState = (state) => {
        switch(state){
            case "Going up": {
                return(
                    <Image
                        source={Images.liftgoingup}
                    />
                )
            }
            case "Going down": {
                return(
                    <Image
                        source={Images.liftgoingdown}
                    />
                )
            }
            case "Doors opening, going up": {
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "Doors Closing, going up": {
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "Doors opening, going down": {
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "Doors Closing, going down": {
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "FAULT": {
                return(
                    <Image
                        source={Images.lifterror}
                    />
                )
            }
            case "PARKED": {
                return(
                    <Image
                        source={Images.liftparked}
                    />
                )
            }
            default :{
                return (
                    <h5>Lift data currently available...</h5>
                )
            }
        }
    }

    const renderBreakdowns = breakdownData => {
        return (
            <ViewBreakdownsTile
                breakdownId={breakdownData.item.breakdownId}
                breakdownTime={breakdownData.item.breakdownTime}
                faultCause={breakdownData.item.faultCause}
                faultCode={breakdownData.item.faultCode}
                recentState={breakdownData.item.recentState}
                onSelect={() => {
                    // props.navigation.navigate({
                    //     routeName: 'CategoryMeals',
                    //     params: {
                    //         docId: itemData.item.id
                    //     }
                    // });
                    alert("You clicked a breakdown id: " + breakdownData.item.breakdownId)
                }}
            />
        );
    };

    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>{monitorName}</Text>
                <Text style={styles.heading}>Equipment Monitor Id: {equipmentMonitorId}</Text>
                <Text style={styles.heading}>{description}</Text>
                <Text style={styles.heading}>Current State: {currentState}</Text>
                <Block middle style={{ marginTop: 15, marginBottom: 15 }}>
                    <Block style={styles.divider} />
                </Block>
                <Block style={styles.group}>{image}</Block>
                <Block middle style={{ marginTop: 15, marginBottom: 15 }}>
                    <Block style={styles.divider} />
                </Block>
                <Text style={styles.title}>Recent Breakdowns: </Text>
                <FlatList
                    keyExtractor={(item, index) => item.id} //Need to check which key!!!
                    data={dataBreakdown}
                    renderItem={renderBreakdowns}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default ViewEquipmentStatus;
