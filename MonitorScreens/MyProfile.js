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

const styles = StyleSheet.create({
    profile: {
        // marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    profileBackground: {
        width: width,
        height: height
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2
    },
    info: {
        paddingHorizontal: 40
    },
    avatarContainer: {
        position: "relative",
        marginTop: -80
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0
    },
    nameInfo: {
        marginTop: 35
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure
    }
});

export default MyProfile;
