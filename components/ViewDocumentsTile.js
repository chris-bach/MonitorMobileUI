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

const ViewDocumentsTile = props => {
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
            Name: {props.name}
          </Text>
          <Text style={styles.heading} numberOfLines={2}>
            Description: {props.description}
          </Text>
          <Block>
            <Text style={styles.normal} numberOfLines={2}>
              Document Id: {props.documentId}
            </Text>
            <Text style={styles.normal} numberOfLines={2}>
              Parent Info: {props.parentInfo}
            </Text>
          </Block>
        </View>
      </TouchableCmp>
    </View>
  );
};

export default ViewDocumentsTile;
