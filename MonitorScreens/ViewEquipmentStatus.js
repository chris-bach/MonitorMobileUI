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

/**
 * @author Matt Belgre, Chris Bautista
 * @description This component displays the current status of the equipment (as reported by the IoT device)
 */
const ViewEquipmentStatus = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    const [breakdownDetails, setBreakdownDetails] = useState([]);
    const [dataBreakdown, setDataBreakdown] = useState([]);

    const monitorName = props.route.params.params.monitorName;
    const equipmentMonitorId = props.route.params.params.equipmentMonitorId;
    const equipmentName = props.route.params.params.equipmentName;
    const description = props.route.params.params.description;
    const equipmentId = props.route.params.params.equipmentId;
    const currentStateInitial = props.route.params.params.currentState;

    const [image, setImage] = useState();
    const [monitor, setMonitor] = useState();
    const [counter, setCounter] = useState(0);
    const [currentState, setCurrentState] = useState(currentStateInitial);

    /**
     * @author Matt Belgre, Chris Bautista
     * @description The next 2 useEffects get the breakdown list from the server and pushes to state
     */
    useEffect(() => {
            getAllByEquipmentMonitorId(equipmentMonitorId)
                .then((response) => {
                    const breakdownList = []
                    response.data.forEach(object => {
                        breakdownList.push(object)
                    })
                    setBreakdownDetails(breakdownList);
                }).catch(error => {
                console.log("useEffect catch: ", error);
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
    }, [breakdownDetails]);

    /**
     * @author Matt Belgre, Chris Bautista
     * @description The next 3 useEffects gets the equipment's status periodically from the server and updates the state and sets the image.
     */
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
                setImage(getLiftState(res.data.currentState))
            })
    }, [counter])

    const getLiftState = (state) => {
        switch(state){
            case "Going up": {
                setCurrentState(state);
                return(
                    <Image
                        source={Images.liftgoingup}
                    />
                )
            }
            case "Going down": {
                setCurrentState(state);
                return(
                    <Image
                        source={Images.liftgoingdown}
                    />
                )
            }
            case "Doors opening, going up": {
                setCurrentState(state);
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "Doors Closing, going up": {
                setCurrentState(state);
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "Doors opening, going down": {
                setCurrentState(state);
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "Doors Closing, going down": {
                setCurrentState(state);
                return(
                    <Image
                        source={Images.liftopenclose}
                    />
                )
            }
            case "FAULT": {
                setCurrentState(state);
                return(
                    <Image
                        source={Images.lifterror}
                    />
                )
            }
            case "PARKED": {
                setCurrentState(state);
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


    /**
     * @author Chris Bautista
     * @description This function uses the ViewBreakDownsTile to style the output of the flatlist
     */
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
                    //alert("You clicked a breakdown id: " + breakdownData.item.breakdownId)
                }}
            />
        );
    };

    /**
     * @author Chris Bautista
     * @description This shows the breakdown report using a flatlist that renders the data styled by RenderBreakdowns
     */
    return (
        <Block flex style={styles.group}>
            <Block flex>
                <Text style={styles.title}>{monitorName}</Text>
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
                    keyExtractor={(item, index) => item.id.toString()} //Need to check which key!!!
                    data={dataBreakdown}
                    renderItem={renderBreakdowns}
                    numColumns={1}
                />
            </Block>
        </Block>
    );
}

export default ViewEquipmentStatus;
