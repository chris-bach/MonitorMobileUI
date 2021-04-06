import {Platform, StyleSheet} from "react-native";
import {argonTheme} from "./index";

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
    tileRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        color: argonTheme.COLORS.PRIMARY,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    heading: {
        fontFamily: 'open-sans-bold',
        color: argonTheme.COLORS.HEADER,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    normal: {
        fontFamily: 'open-sans-regular',
        fontSize: 12,
        textAlign: 'auto',
        color: argonTheme.COLORS.TEXT
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
});

export default styles;
