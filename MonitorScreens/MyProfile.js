import React, {useContext} from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform, TouchableOpacity, TouchableNativeFeedback, View, FlatList,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

import styles from "../constants/ScreenTheme";
import {LogInContext} from "../context/LogInContext";

const MyProfile = props => {
    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    //console.log(userInfo);
    //console.log(userOrganisation);

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback; //ripple effect
    }

    return (
        <Block flex style={styles.profile}>
            <Block flex>
                {/*<ImageBackground*/}
                {/*    source={Images.LoginBG}*/}
                {/*    style={styles.profileContainer}*/}
                {/*    imageStyle={styles.profileBackground}*/}
                {/*>*/}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width, marginTop: "15%" }}
                    >
                        <Block flex style={styles.profileCard}>
                            <Block middle style={styles.avatarContainer}>
                                <Image
                                    source={ Images.ProfilePicture }
                                    style={styles.profilepic}
                                />
                            </Block>
                            <Block flex>
                                <View style={{ ...styles.group}}>
                                    <Text style={styles.title} numberOfLines={2}>
                                        Personal Details
                                    </Text>
                                    <Block>
                                        <Text style={styles.normal}>
                                            User ID: {userInfo.id}
                                        </Text>
                                        <Text style={styles.normal}>
                                            First Name: {userInfo.firstName}
                                        </Text>
                                        <Text style={styles.normal}>
                                            Last Name: {userInfo.lastName}
                                        </Text>
                                        <Text style={styles.normal}>
                                            Email: {userInfo.email}
                                        </Text>
                                    </Block>
                                    <Block style={{ marginTop: 15}}>
                                        <TouchableCmp style={{ flex: 1 }}>
                                            <Button
                                                onPress={() => {
                                                    props.navigation.navigate('Update Personal Details',
                                                        {
                                                            // params: {
                                                            //     jobIdentifier: jobIdentifier,
                                                            //     address: address,
                                                            //                                                             //     jobId: jobId,
                                                            //                                                             //     jobName: jobName
                                                            // }
                                                        });
                                                }}
                                            >UPDATE DETAILS</Button>
                                        </TouchableCmp>
                                    </Block>
                                </View>
                                    <Block middle style={{ marginTop: 15, marginBottom: 15 }}>
                                        <Block style={styles.divider} />
                                    </Block>
                                <View style={{alignItems: 'center', marginBottom: 30}}>
                                    <Text style={styles.title} numberOfLines={2}>
                                        Organisation Details
                                    </Text>
                                    <Block>
                                        {/*<Text style={styles.normal}>*/}
                                        {/*    Organisation ID: {userOrganisation.organisationId}*/}
                                        {/*</Text>*/}
                                        <Text style={styles.normal}>
                                            Organisation Name: {userOrganisation.organisationName}
                                        </Text>
                                        <Text style={styles.normal}>
                                            Organisation Email: {userOrganisation.email}
                                        </Text>
                                        <Text style={styles.normal}>
                                            Organisation Address: {userOrganisation.address}
                                        </Text>
                                        <Text style={styles.normal}>
                                            Organisation Contact Number: {userOrganisation.contactNumber}
                                        </Text>
                                    </Block>
                                </View>
                            </Block>
                        </Block>
                    </ScrollView>
                {/*</ImageBackground>*/}
            </Block>
        </Block>
    );
}

export default MyProfile;
