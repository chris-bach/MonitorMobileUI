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
 * @description This component controls the styling for displaying the equipment details flatlist
 */
const ViewEquipmentDetailsTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback; //ripple effect
  }

  console.log(props.status)
  return (
      <View style={styles.gridItem}>
        <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
          <View
              style={{ ...styles.container}}
          >
            <Text style={styles.title} numberOfLines={2}>
              {props.monitorName}
            </Text>
            <Text style={styles.heading} numberOfLines={2}>
              {props.description}
            </Text>
            <Text style={{...styles.heading, ...{color: argonTheme.COLORS.WHITE},...{ backgroundColor: props.status ? argonTheme.COLORS.SUCCESS : argonTheme.COLORS.ERROR}}}>
              {props.status ? "Operating Normally" : "Faulty!"}
            </Text>
            {/*<Text style={styles.normal} numberOfLines={2}>*/}
            {/*  Equipment Id: {props.equipmentId}*/}
            {/*</Text>*/}
            <Block>
              <Text style={styles.normal} numberOfLines={2}>
                Equipment Name: {props.equipmentName}
              </Text>
              <Text style={styles.normal} numberOfLines={2}>
                Manufacturer: {props.manufacturer}
              </Text>
              <Text style={styles.normal} numberOfLines={2}>
                Model: {props.model}
              </Text>
              {/*<Text style={styles.normal} numberOfLines={2}>*/}
              {/*  Current State: {props.currentState}*/}
              {/*</Text>*/}
              {/*<Text style={styles.normal} numberOfLines={2}>*/}
              {/*  Equipment Monitor Id: {props.equipmentMonitorId}*/}
              {/*</Text>*/}
              {/*<Text style={styles.normal} numberOfLines={2}>*/}
              {/*  Flags: {props.flags}*/}
              {/*</Text>*/}
              {/*<Text style={styles.normal} numberOfLines={2}>*/}
              {/*  IP Address: {props.ipAddress}*/}
              {/*</Text>*/}
            </Block>
          </View>
        </TouchableCmp>
      </View>
  );
};

export default ViewEquipmentDetailsTile;
