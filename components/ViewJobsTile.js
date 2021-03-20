import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

const ViewJobsTile = props => {
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
            Address: {props.address}
          </Text>
          <Text style={styles.normal} numberOfLines={2}>
            Start Date: {props.startDate}
          </Text>
          <Text style={styles.normal} numberOfLines={2}>
            End Date: {props.endDate}
          </Text>
          <Text style={styles.normal} numberOfLines={2}>
            Latitude: {props.latitude}
          </Text>
          <Text style={styles.normal} numberOfLines={2}>
            Longitude: {props.longitude}
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

export default ViewJobsTile;
