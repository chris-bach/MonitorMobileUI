import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import argonTheme from "../constants/Theme";
import { AsyncStorage } from 'react-native';

/**
 * @author CreativeTIM, Chris Bautista
 * @description This file controls the styling of the menu drawer
 */
class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;
    switch (title) {

      case "Dashboard":
        return (
            <Icon
                name="shop"
                family="ArgonExtra"
                size={14}
                color={focused ? "white" : argonTheme.COLORS.DEFAULT}
            />
        );
      case "My Jobs":
        return (
            <Icon
                name="calendar-date"
                family="ArgonExtra"
                size={14}
                color={focused ? "white" : argonTheme.COLORS.DEFAULT}
            />
        );
      case "My Documents":
        return (
            <Icon
                name="map-big"
                family="ArgonExtra"
                size={14}
                color={focused ? "white" : argonTheme.COLORS.DEFAULT}
            />
        );
      case "My Profile":
        return (
            <Icon
                name="hat-3"
                family="ArgonExtra"
                size={14}
                color={focused ? "white" : argonTheme.COLORS.DEFAULT}
            />
        );
      case "Log Out":
        return <Icon
            name="nav-left"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.DEFAULT}
        />;
      default:
        return null;
    }
  };

  logout = () =>{
    this.props.navigation.popToTop();
    AsyncStorage.setItem('Authorization', "")
  }

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => title == 'Log Out' ? this.logout() : navigation.navigate(title)}
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{ fontFamily: "open-sans-regular" }}
              size={15}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 2
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACCENT,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
