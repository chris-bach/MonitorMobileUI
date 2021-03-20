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
                        Equipment Name: {props.equipmentName}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Description: {props.description}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Equipment Id: {props.equipmentId}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Manufacturer: {props.manufacturer}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Model: {props.model}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Current State: {props.currentState}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Equipment Monitor Id: {props.equipmentMonitorId}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Flags: {props.flags}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        IP Address: {props.ipAddress}
                    </Text>
                    <Text style={styles.normal} numberOfLines={2}>
                        Status: {props.status}
                    </Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        // height: 150,
        borderRadius: 10,
        //overflow: 'hidden',
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5,

    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
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
