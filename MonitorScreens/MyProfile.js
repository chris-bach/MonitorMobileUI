import React, {useContext} from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import {LogInContext} from "../context/LogInContext";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const  MyProfile = props =>{
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
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    title: {
        fontFamily: 'open-sans-bold',
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 44,
        color: argonTheme.COLORS.HEADER
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2
    },
    button: {
        marginBottom: theme.SIZES.BASE,
        width: width - theme.SIZES.BASE * 2
    },
    optionsButton: {
        width: "auto",
        height: 34,
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: 10
    },
    input: {
        borderBottomWidth: 1
    },
    inputDefault: {
        borderBottomColor: argonTheme.COLORS.PLACEHOLDER
    },
    inputTheme: {
        borderBottomColor: argonTheme.COLORS.PRIMARY
    },
    inputInfo: {
        borderBottomColor: argonTheme.COLORS.INFO
    },
    inputSuccess: {
        borderBottomColor: argonTheme.COLORS.SUCCESS
    },
    inputWarning: {
        borderBottomColor: argonTheme.COLORS.WARNING
    },
    inputDanger: {
        borderBottomColor: argonTheme.COLORS.ERROR
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: "center"
    }
});

export default MyProfile;
