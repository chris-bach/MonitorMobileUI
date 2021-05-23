import React, {useState, useEffect} from "react";
import {
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Platform, View, AsyncStorage,
} from "react-native";
import { Block, Button ,Text, Input, theme } from "galio-framework";
import AuthInput from "../components/AuthInput";

const { height, width } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import styles from "../constants/ScreenTheme";
import Dashboard from "./Dashboard";
import { useNavigation } from '@react-navigation/native';
import {axiosInstance} from "../Interceptor";

/**
 * @author Manik Bagga, Chris Bautista, Matth Belgre
 * @description This is the login page. It makes use of AuthInput (Manik), LogInContext(Manik) and LogInReducer (Manik)
 * The main function is handled by AuthInput
 */
const Login = (props) => {

    /**
     *
     * @param history the page history
     * @returns axiosInstance the custom instance of axios
     */
    const navigation = useNavigation();
    axiosInstance(props);


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

export default Login;
