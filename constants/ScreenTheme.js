import {Platform, StyleSheet} from "react-native";
import {argonTheme} from "./index";
import {theme} from "galio-framework";

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        // height: 150,
        borderRadius: 10,
        //overflow: 'hidden',
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5,

    },
    group: {
        paddingTop: theme.SIZES.BASE * 2,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: argonTheme.COLORS.BLOCK,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        // justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        color: argonTheme.COLORS.PRIMARY,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    heading: {
        fontFamily: 'open-sans-bold',
        color: argonTheme.COLORS.HEADER,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    normal: {
        fontFamily: 'open-sans-regular',
        fontSize: 14,
        textAlign: 'left',
        color: argonTheme.COLORS.TEXT
    },
    highlight: {
        backgroundColor: argonTheme.COLORS.ACCENT,
        paddingHorizontal: 8,
        marginLeft: 3,
        borderRadius: 4,
        height: 22,
        marginTop: 15
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
});

export default styles;
