import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableNativeFeedback
} from 'react-native';

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
                        Breakdown ID: {props.breakdownId}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Breakdown Time: {props.breakdownTime}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Fault Cause: {props.faultCause}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Fault Code: {props.faultCode}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Recent State: {props.recentState}
                    </Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        // flex: 1,
        // margin: 15,
        // // height: 150,
        // borderRadius: 10,
        // //overflow: 'hidden',
        // overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        // elevation: 5,

    },
    container: {
        // flex: 1,
        // borderRadius: 10,
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 10,
        // elevation: 3,
        // padding: 15,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'right'
    },
    normal: {
        fontFamily: 'open-sans-regular',
        fontSize: 14,
        textAlign: 'right'
    }
});

export default ViewBreakdownsTile;