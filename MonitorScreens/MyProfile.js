import React, {useContext} from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

import {LogInContext} from "../context/LogInContext";

import styles from "../constants/ScreenTheme";

const MyProfile = props => {
    const {userInfo} = useContext(LogInContext);
    const {userOrganisation} = useContext(LogInContext);

    console.log(userInfo);
    console.log(userOrganisation);
    return (
        <Block flex style={styles.profile}>
            <Block flex>
                <ImageBackground
                    source={Images.LoginBG}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width, marginTop: "15%" }}
                    >
                        <Block flex style={styles.profileCard}>
                            <Block middle style={styles.avatarContainer}>
                                <Image
                                    source={ Images.ProfilePicture }
                                    style={styles.avatar}
                                />
                            </Block>
                            <Block flex>
                                <Block middle style={styles.nameInfo}>
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
                                    <Text style={styles.normal}>
                                        Organisation ID: {userOrganisation.organisationId}
                                    </Text>
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
                                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                                    <Block style={styles.divider} />
                                </Block>
                                <Block middle>
                                    <Button
                                        color="transparent"
                                        textStyle={{
                                            color: "#233DD2",
                                            fontWeight: "500",
                                            fontSize: 16,
                                            fontFamily: 'open-sans-regular'
                                        }}
                                    >
                                        Save Details
                                    </Button>
                                </Block>

                            </Block>
                        </Block>
                    </ScrollView>
                </ImageBackground>
            </Block>
        </Block>
    );
}

export default MyProfile;
