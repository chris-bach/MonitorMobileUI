import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableNativeFeedback, FlatList
} from 'react-native';

import styles from "../constants/TileTheme";
import {Block} from "galio-framework";
import {argonTheme} from "../constants";

/**
 * @author Chris Bautista
 * @description This component controls the styling for displaying the notifications flatlist
 */
const ViewNotificationTile = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
                <View
                    style={{ ...styles.container}}
                >
                    <Text style={{...styles.heading, ...{color: props.read ? argonTheme.COLORS.HEADER : argonTheme.COLORS.WHITE},...{ backgroundColor: props.read ? null : argonTheme.COLORS.ERROR}}}>
                        {props.read ? "Read" : "Unread"}
                    </Text>
                    <Block>
                        <Text style={styles.normal} numberOfLines={2}>
                            Job Name: {props.jobName}
                        </Text>
                        <Text style={styles.normal} numberOfLines={2}>
                            Breakdown Date: {props.breakdownTime}
                        </Text>
                        <Text style={styles.normal} numberOfLines={2}>
                            Device Name: {props.deviceName}
                        </Text>
                        <Text style={styles.normal} numberOfLines={2}>
                            Address: {props.address}
                        </Text>
                        <Text style={styles.normal} numberOfLines={2}>
                            Fault Code: {props.faultCode}
                        </Text>
                        <Text style={styles.normal} numberOfLines={2}>
                            Last State: {props.lastState}
                        </Text>
                    </Block>
                </View>
            </TouchableCmp>
        </View>
    );
};

export default ViewNotificationTile;
