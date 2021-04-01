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

const ViewEquipmentDetailsTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback; //ripple effect
  }

  const renderBreakdowns = breakdownData => {
    return (
        <ViewBreakdownsTile
            breakdownId={breakdownData.item.breakdownId}
            breakdownTime={breakdownData.item.breakdownTime}
            faultCause={breakdownData.item.faultCause}
            faultCode={breakdownData.item.faultCode}
            recentState={breakdownData.item.recentState}
            onSelect={() => {
              // props.navigation.navigate({
              //     routeName: 'CategoryMeals',
              //     params: {
              //         docId: itemData.item.id
              //     }
              // });
              alert("You clicked a breakdown id: " + breakdownData.item.breakdownId)
            }}
        />
    );
  };

  return (
      <View style={styles.gridItem}>
        <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
          <View
              style={{ ...styles.container}}
          >
            <Text style={styles.title} numberOfLines={2}>
              Equipment Name: {props.equipmentName}
            </Text>
            <Text style={styles.heading} numberOfLines={2}>
              Description: {props.description}
            </Text>
            {/*<Text style={styles.normal} numberOfLines={2}>*/}
            {/*  Equipment Id: {props.equipmentId}*/}
            {/*</Text>*/}
            <Block>
              <Text style={styles.normal} numberOfLines={2}>
                Manufacturer: {props.manufacturer}
              </Text>
              <Text style={styles.normal} numberOfLines={2}>
                Model: {props.model}
              </Text>
              <Text style={styles.normal} numberOfLines={2}>
                Current State: {props.currentState}
              </Text>
              {/*<Text style={styles.normal} numberOfLines={2}>*/}
              {/*  Equipment Monitor Id: {props.equipmentMonitorId}*/}
              {/*</Text>*/}
              {/*<Text style={styles.normal} numberOfLines={2}>*/}
              {/*  Flags: {props.flags}*/}
              {/*</Text>*/}
              {/*<Text style={styles.normal} numberOfLines={2}>*/}
              {/*  IP Address: {props.ipAddress}*/}
              {/*</Text>*/}
              <Text style={styles.normal} numberOfLines={2}>
                Status: {props.status}
              </Text>
            </Block>
            <FlatList
                keyExtractor={(item, index) => item.id} //Need to check which key!!!
                data={props.breakdowns}
                renderItem={renderBreakdowns}
                numColumns={1}
            />
          </View>
        </TouchableCmp>
      </View>
  );
};

export default ViewEquipmentDetailsTile;
