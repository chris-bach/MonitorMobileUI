import React, {useState, useEffect} from "react";
import {
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Platform, View,
} from "react-native";
import { Block, Button ,Text, Input, theme } from "galio-framework";
import AuthInput from "../components/AuthInput";

const { height, width } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import styles from "../constants/ScreenTheme";


export default class Login extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={{...styles.container, paddingTop:75}}>
        <StatusBar barStyle="dark-content" />
          <Block flex style={{...styles.padded}}>
              <Block style={{alignItems: 'flex-end'}}>
                <Image
                  source={Images.LogoB}
                  style={{
                    resizeMode: "contain",
                    height: 150,
                    width: 350 }}
                />
              </Block>
              <Block style={{paddingTop: 35}}>
                  <AuthInput nav={navigation}/>
              </Block>
              <View style={{alignItems: 'center'}}>
                  <Block>
                    <Text style={{...styles.highlight, ...styles.heading, color: 'white'}}>
                      Created by Team Monitor
                    </Text>
                  </Block>
                  <Block>
                    <Text style={{...styles.normal}}>
                      Matthew Belgre: Team Leader
                    </Text>
                    <Text style={{...styles.normal}}>
                      Patrick Bornay: Full Stack Developer
                    </Text>
                    <Text style={{...styles.normal}}>
                      Molin Lai: Graphic/UI Designer/Documentation
                    </Text>
                    <Text style={{...styles.normal}}>
                      Manik Bagga: Full Stack Developer
                    </Text>
                    <Text style={{...styles.normal}}>
                      Christian Bautista: Front End/Documentation/Marketing
                    </Text>
                  </Block>
              </View>
          </Block>
      </Block>
    );
  }
}
