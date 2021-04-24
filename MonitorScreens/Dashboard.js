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

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

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

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log("From inside listener: ", notification)
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("From inside response: ", response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

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
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <Text>Your expo push token: {expoPushToken}</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Title: {notification && notification.request.content.title} </Text>
                            <Text>Body: {notification && notification.request.content.body}</Text>
                            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                        </View>
                        <Button
                            title="Press to Send Notification"
                            onPress={async () => {
                                await sendPushNotification(expoPushToken);
                            }}
                        />
                    </View>
                </Block>
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
                                        data: bbdata
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={500}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            verticalLabelRotation={90}
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

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
