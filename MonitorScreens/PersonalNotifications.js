import React, {useEffect, useState, useContext} from "react";
import {ScrollView, Alert, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback} from "react-native";
import { Block, Text } from "galio-framework";
import { Notification } from "../components";
import { argonTheme } from "../constants";

import {LogInContext} from "../context/LogInContext";
import {getNotificationsByUserId, markNotificationAsRead} from "../Services/NotificationService";
import ViewNotificationTile from "../components/ViewNotificationTile";
import ViewJobsTile from "../components/ViewJobsTile";

const PersonalNotifications = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    const userId = userInfo.id;

    const [notifications, setNotifications] = useState([]); //Notifications array
    const [data, setData] = useState([]);
    const [readCounter, setReadCounter] = useState(0);

    useEffect(() => {
            getNotificationsByUserId(userId)
                .then((response) => {
                    const noteList = []
                    response.data.forEach(object => {
                        noteList.push(object)
                    })
                    setNotifications(noteList)
                }).catch(error => {
                console.log(error)
            })
        },
        [userId]);

    useEffect(() => {
            getNotificationsByUserId(userId)
                .then((response) => {
                    const noteList = []
                    response.data.forEach(object => {
                        noteList.push(object)
                    })
                    setNotifications(noteList)
                }).catch(error => {
                console.log(error)
            })
        },
        [readCounter]);

    useEffect(() => {
        const tableData = [];
        notifications.forEach((notification, key) => {
            let notificationInfo = {
                id: key,
                notificationId: notification.notificationId,
                address: notification.address,
                deviceName: notification.deviceName,
                faultCause: notification.faultCause,
                faultCode: notification.faultCode,
                jobName: notification.jobName,
                lastState: notification.lastState,
                read: notification.read,
            };
            tableData.push(notificationInfo);
        })
        setData(tableData);
    }, [notifications]);

    const markAsRead = (id) => {
        //setNotificationModal(null);
        markNotificationAsRead(id).then(()=>{
            const counter = readCounter + 1
            setReadCounter(counter)
        }).catch(err => console.log(err))
    };

    const renderItem = itemData => {
        return (
            <ViewNotificationTile
                notificationId={itemData.item.notificationId}
                address={itemData.item.address}
                deviceName={itemData.item.deviceName}
                faultCause={itemData.item.faultCause}
                faultCode={itemData.item.faultCode}
                jobName={itemData.item.jobName}
                lastState={itemData.item.lastState}
                read={itemData.item.read}
                onSelect={() => {
                    Alert.alert(
                        "Notification",
                        "",
                        [
                            {
                                text: "Mark As Read",
                                onPress: () => {
                                    markAsRead(itemData.item.notificationId)
                                },
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => {

                                } }
                        ]
                    )
                }}
            />
        );
    };

    return (
      <Block middle flex>
          <FlatList
              keyExtractor={(item, index) => item.id.toString()}  //Need to check which key!!!
              data={data}
              renderItem={renderItem}
              numColumns={1}
          />
      </Block>
    );
}

export default PersonalNotifications;
