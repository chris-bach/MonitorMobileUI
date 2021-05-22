import React from "react";
import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from '../components/index'


const { width } = Dimensions.get("screen");

/**
 * @author CreativeTIM, Chris Bautista
 * @description This file controls what's displayed in the menu.
 * There are some unused assets that we've kept that we may use in future iterations of the app.
 */

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const screens = [
    "Dashboard",
    "My Jobs",
    //"My Documents",
    "My Profile",
    //"Scratchpad",
    // "Home",
    // "Profile",
    // "Account",
    //"Elements",
    // "Articles",
    //"Settings",
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
      <Image styles={styles.logo} source={Images.LogoB}
             style={{ marginBottom: theme.SIZES.BASE * 1.5,
          resizeMode: "contain",
          height: 150,
          width: 150 }}/>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
            {/*<Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>*/}
            {/*  <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>*/}
            {/*  <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8, fontFamily: 'open-sans-regular' }}>DOCUMENTATION</Text>*/}
            {/*</Block>*/}
            {/*<DrawerCustomItem title="Getting Started" navigation={navigation} />*/}
            <DrawerCustomItem title="Log Out" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  }
});

export default CustomDrawerContent;
