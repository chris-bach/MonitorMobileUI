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

/**
 * @author Chris Bautista
 * @description This component controls the styling for displaying the jobs flatlist
 */
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
            {props.jobName}
          </Text>
          <Text style={styles.heading} numberOfLines={2}>
            {props.address}
          </Text>
          <Block>
            <Text style={styles.normal} numberOfLines={2}>
              Manager: {props.firstName} {props.lastName}
            </Text>
            <Text style={styles.normal} numberOfLines={2}>
              Manager E-mail: {props.email}
            </Text>
            <Text style={styles.normal} numberOfLines={2}>
              Start Date: {props.startDate}
            </Text>
            <Text style={styles.normal} numberOfLines={2}>
              End Date: {props.endDate}
            </Text>
          </Block>
          {/*<Text style={styles.normal} numberOfLines={2}>*/}
          {/*  Latitude: {props.latitude}*/}
          {/*</Text>*/}
          {/*<Text style={styles.normal} numberOfLines={2}>*/}
          {/*  Longitude: {props.latitude}*/}
          {/*</Text>*/}
        </View>
      </TouchableCmp>
    </View>
  );
};

export default ViewJobsTile;
