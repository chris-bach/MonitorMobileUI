import React, {useEffect, useState, useContext, useRef} from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity, Platform, TouchableNativeFeedback, Linking, FlatList
} from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

import axios from "axios";

const { width } = Dimensions.get("screen");

import styles from "../constants/ScreenTheme";
import {LogInContext} from "../context/LogInContext";

import {getMonthlyBreakdowns} from "../Services/DashboardService";
import {getBreakdownsPerBuilding} from "../Services/DashboardService";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

/**
 * @author Chris Bautista
 * @description This component renders the dashboard. It is the home screen of the app after logging in.
 */
const Dashboard = () => {
    // const userId = 1;
    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const userId = userInfo.id;

    const [monthlyBreakdownsList, setMonthlyBreakdownsList] = useState([]);
    const [mlabels, setmLabels] = useState([]);
    const [mdata, setmData] = useState([]);

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    /**
     * @author Matt Belgre, Chris Bautista
     * @description The following useEffects get the monthly breakdown data from the server and pushes into the state.
     */
    useEffect(() => {
            getMonthlyBreakdowns(userId)
                .then((response) => {
                    const list = []
                    response.data.forEach(object => {
                        list.push(object)
                    })
                    setMonthlyBreakdownsList(list);
                }).catch(error => {
                console.log(error)
            })
        },
        []);

    useEffect(() => {
        const listData = [];
        const listLabels = [];
        monthlyBreakdownsList.forEach((data, key) => {
            let int = parseInt(data.breakdowns)
            listLabels.push(data.month);
            listData.push(int);
        })
        setmData(listData);
        setmLabels(listLabels);
    }, [monthlyBreakdownsList]);

    const [breakdownsPerBuildingList, setBreakdownsPerBuildingList] = useState([]);
    const [bblabels, setbbLabels] = useState([]);
    const [bbdata, setbbData] = useState([]);

    /**
     * @author Matt Belgre, Chris Bautista
     * @description The following useEffects get the breakdowns per building data from the server and pushes into the state.
     */
    useEffect(() => {
            getBreakdownsPerBuilding(userId)
                .then((response) => {
                    const list = []
                    response.data.forEach(object => {
                        list.push(object)
                    })
                    setBreakdownsPerBuildingList(list);
                }).catch(error => {
                console.log(error)
            })
        },
        []);

    useEffect(() => {
        const listData = [];
        const listLabels = [];
        breakdownsPerBuildingList.forEach((data, key) => {
            let int = parseInt(data.breakdowns)
            listLabels.push(data.buildingAddress);
            listData.push(int);
        })
        setbbData(listData);
        setbbLabels(listLabels);
    }, [breakdownsPerBuildingList]);

    /**
     * @author indiespirit, Chris Bautista
     * @description Renders the dashboard charts using react-native-chart-kit by indiespirit
     */
    return (
        <Block flex style={styles.group}>
            <ScrollView>
                <Block>
                    <View>
                        <Text style={styles.title}>Monthly Breakdowns</Text>
                        <BarChart
                            data={{
                                labels: mlabels,
                                datasets: [
                                    {
                                        data: mdata
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: argonTheme.COLORS.PRIMARY,
                                backgroundGradientFrom: argonTheme.COLORS.ACCENT,
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </Block>
                {/*Table 2*/}
                <Block>
                    <View>
                        <Text style={styles.title}>Breakdowns Per Building</Text>
                        <BarChart
                            data={{
                                labels: bblabels,
                                datasets: [
                                    {
                                        data: bbdata
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={500}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            verticalLabelRotation={45}
                            chartConfig={{
                                backgroundColor: argonTheme.COLORS.PRIMARY,
                                backgroundGradientFrom: argonTheme.COLORS.ACCENT,
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            // bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </Block>
            </ScrollView>
        </Block>
    );
}
export default Dashboard;
