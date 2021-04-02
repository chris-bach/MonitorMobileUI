import React, {useEffect, useState, useContext} from "react";
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

    useEffect(() => {
            getMonthlyBreakdowns(userId)
                .then((response) => {
                    const list = []
                    response.data.forEach(object => {
                        list.push(object)
                        // setIsLoading(true)
                        // console.log("Object", object)
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
            // let dataObject = {
            //     id: key,
            //     breakdowns: data.breakdowns,
            // };
            // let labelObject = {
            //     id: key,
            //     month: data.month,
            // };

            let int = parseInt(data.breakdowns)
            listLabels.push(data.month);
            listData.push(int);
            // listLabels.push(labelObject);
            // listData.push(dataObject);
        })
        setmData(listData);
        setmLabels(listLabels);
    }, [monthlyBreakdownsList]);

    const [breakdownsPerBuildingList, setBreakdownsPerBuildingList] = useState([]);
    const [bblabels, setbbLabels] = useState([]);
    const [bbdata, setbbData] = useState([]);

    useEffect(() => {
            getBreakdownsPerBuilding(userId)
                .then((response) => {
                    const list = []
                    response.data.forEach(object => {
                        list.push(object)
                        // setIsLoading(true)
                        // console.log("Object", object)
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
            // let dataObject = {
            //     id: key,
            //     breakdowns: data.breakdowns,
            // };
            // let labelObject = {
            //     id: key,
            //     month: data.month,
            // };

            let int = parseInt(data.breakdowns)
            listLabels.push(data.buildingAddress);
            listData.push(int);
            // listLabels.push(labelObject);
            // listData.push(dataObject);
        })
        setbbData(listData);
        setbbLabels(listLabels);
    }, [breakdownsPerBuildingList]);

    const check = () => {
        console.log ("Checking labels", mlabels);
        console.log ("Checking data", mdata);
    }

    return (
        <Block flex style={styles.group}>
            {/*<Button onPress={check}>Check</Button>*/}
            <ScrollView>
                {/*Table 1*/}
                <Block>
                    <View>
                        <Text style={styles.title}>Monthly Breakdowns</Text>
                        <LineChart
                            data={{
                                labels: mlabels,
                                datasets: [
                                    {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100
                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: argonTheme.COLORS.PRIMARY,
                                backgroundGradientFrom: argonTheme.COLORS.ACCENT,
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
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
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100
                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: argonTheme.COLORS.PRIMARY,
                                backgroundGradientFrom: argonTheme.COLORS.ACCENT,
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
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
