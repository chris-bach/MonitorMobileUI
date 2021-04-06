import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableNativeFeedback
} from 'react-native';

import styles from "../constants/TileTheme";
import {Block} from "galio-framework";

const ViewBreakdownsTile = props => {
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
                    <Text style={styles.title} numberOfLines={2}>
                        Fault Cause: {props.faultCause}
                    </Text>
                    <Text style={styles.heading} numberOfLines={2}>
                        Breakdown Time: {props.breakdownTime}
                    </Text>
                    <Block>
                        <Text style={styles.normal} numberOfLines={2}>
                            Recent State: {props.recentState}
                        </Text>
                        <Text style={styles.normal} numberOfLines={2}>
                            Fault Code: {props.faultCode}
                        </Text>
                        <Text style={styles.normal} numberOfLines={2}>
                            Breakdown ID: {props.breakdownId}
                        </Text>
                    </Block>
                </View>
            </TouchableCmp>
        </View>
    );
};

export default ViewBreakdownsTile;
