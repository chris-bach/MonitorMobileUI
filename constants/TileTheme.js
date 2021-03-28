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
        // alignItems: 'flex-start'
    },
    title: {
        fontFamily: 'open-sans-bold',
        color: argonTheme.COLORS.PRIMARY,
        fontSize: 20,
        textAlign: 'center'
    },
    heading: {
        fontFamily: 'open-sans-bold',
        color: argonTheme.COLORS.HEADER,
        fontSize: 16,
        textAlign: 'left'
    },
    normal: {
        fontFamily: 'open-sans-regular',
        fontSize: 14,
        textAlign: 'left',
        color: argonTheme.COLORS.TEXT
    }
});

export default styles;
