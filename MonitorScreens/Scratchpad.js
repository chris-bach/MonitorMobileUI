import React, {useEffect, useState,useContext} from "react";
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


const userId = 1;

const Scratchpad = () => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    const [monthlyBreakdownsList, setMonthlyBreakdownsList] = useState([]);
    const [mlabels, setmLabels] = useState([]);
    const [mdata, setmData] = useState([]);

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
                    // console.log("Response", response)
                    // console.log("List", list)
                    // console.log("monthly", monthlyBreakdownsList)
                }).catch(error => {
                console.log(error)
                // alert('Monthly Breakdowns NOT got!');
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
                let labelObject = {
                    id: key,
                    month: data.month,
                };

                let int = parseInt(data.breakdowns)
                listLabels.push(data.month);
                // listLabels.push(labelObject);
                listData.push(int);
            })
            setmData(listData);
            setmLabels(listLabels);
            // console.log("Breakdowns", mdata)
            // console.log("Labels", mlabels)
            // alert('Breakdowns data pushed!');
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
                        console.log("Object", object)
                    })
                    setBreakdownsPerBuildingList(list);
                    console.log("Response", response)
                    // console.log("List", list)
                    console.log("Buildings", breakdownsPerBuildingList)
                }).catch(error => {
                console.log(error)
                alert('Building  Breakdowns NOT got!');
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
                // listLabels.push(labelObject);
                listData.push(int);
            })
            setbbData(listData);
            setbbLabels(listLabels);
            console.log("Breakdowns", bbdata)
            console.log("Labels", bblabels)
            alert('Breakdowns data pushed!');
        }, [breakdownsPerBuildingList]);

    const check = () => {
        // console.log (monthlyBreakdownsList);
        console.log ("Checking labels", mlabels);
        console.log ("Checking data", mdata);
    }


    return (
        <Block flex style={styles.group}>
            <Button onPress={check}>Check</Button>
            <ScrollView>
                <View>
                    <Text>Bezier Line Chart</Text>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
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
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
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
            </ScrollView>

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

export default Scratchpad;
