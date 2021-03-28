import React, {useState, useEffect} from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import { Block, Button ,Text, Input, theme } from "galio-framework";
import AuthInput from "../components/AuthInput";

const { height, width } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";




export default class Login extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="dark-content" />
          <Block flex style={styles.padded}>
              <Block>
                <Image
                  source={Images.LogoB}
                  style={{ align: "center",
                    resizeMode: "contain",
                    height: 150,
                    width: 350 }}
                />
              </Block>
                  <AuthInput nav={navigation}/>

              <Text
                size={16}
                color="black"
                style={{ marginTop: 35, fontFamily: 'open-sans-regular' }}
              >
                Take advantage of all the features and screens made upon Galio
                Design System, coded on React Native for both.
              </Text>
              <Block flex middle style={styles.pro}>
                <Text style={{ fontFamily: 'open-sans-bold' }} size={16} color="white">
                  By The Monitor Teams
                </Text>
              </Block>

          </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.white,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE,
    zIndex: 3,
    position: "absolute",
    top: theme.SIZES.BASE * 15
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    color:"white",

  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 15
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
