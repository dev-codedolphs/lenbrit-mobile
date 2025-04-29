import { StyleSheet } from 'react-native'
import { color } from '../theme/colors'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { fontSize, fontWeight } from '../theme/fonts'

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
    },
    flexRow: {
        flexDirection: 'row',
    },
    // positioning
    positionRelative: {
        position: 'relative'
    },
    positionAbsolute: {
        position: 'absolute'
    },
    // main axis aligner
    jspaceBetween: {
        justifyContent: 'space-between'
    },
    jspaceAround: {
        justifyContent: 'space-around'
    },
    jspaceEvenly: {
        justifyContent: 'space-evenly'
    },
    jstart: {
        justifyContent: 'flex-start'
    },
    jend: {
        justifyContent: 'flex-end'
    },
    jcenter: {
        justifyContent: 'center'
    },
    alignbaseline: {
        alignItems: 'baseline'
    },
    aligncenter: {
        alignItems: 'center'
    },
    alignstretch: {
        alignItems: 'stretch'
    },
    alignstart: {
        alignItems: 'flex-start'
    },
    alignend: {
        alignItems: 'flex-end'
    },
    //   aligners combined
    centerCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    startCenter: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    endCenter: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    spaceBetweenCenter: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spaceAroundCenter: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    spaceEvenlyCenter: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    //  self aligner
    selfCenter: {
        alignSelf: 'center',
    },
    selfStart: {
        alignSelf: 'flex-start',
    },
    selfEnd: {
        alignSelf: 'flex-end',
    },
    // modal
    floatingModal: {
        borderRadius: wp(2),
        backgroundColor: color.White,
        position: 'absolute',
        top: '30%',
        alignSelf: 'center',
        padding: wp(5),
        width: wp(80),
        elevation: 10,
        shadowColor: color.Black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 150,
    },
    // text
    sevenLow: {
        fontSize: fontSize.font7,
        fontWeight: fontWeight.low,
        height: "auto",
        color: color.Black
    },
    sevenNormal: {
        fontSize: fontSize.font7,
        fontWeight: fontWeight.normal,
        height: "auto",
        color: color.Black
    },
    sevenSemi: {
        fontSize: fontSize.font7,
        fontWeight: fontWeight.semi,
        height: "auto",
        color: color.Black
    },
    sevenBold: {
        fontSize: fontSize.font7,
        fontWeight: fontWeight.bold,
        height: "auto",
        color: color.Black
    },
    sevenFull: {
        fontSize: fontSize.font7,
        fontWeight: fontWeight.full,
        height: "auto",
        color: color.Black
    },
    sixLow: {
        fontSize: fontSize.font6,
        fontWeight: fontWeight.low,
        height: "auto",
        color: color.Black
    },
    sixNormal: {
        fontSize: fontSize.font6,
        fontWeight: fontWeight.normal,
        height: "auto",
        color: color.Black
    },
    sixSemi: {
        fontSize: fontSize.font6,
        fontWeight: fontWeight.semi,
        height: "auto",
        color: color.Black
    },
    sixBold: {
        fontSize: fontSize.font6,
        fontWeight: fontWeight.bold,
        height: "auto",
        color: color.Black
    },
    sixFull: {
        fontSize: fontSize.font6,
        fontWeight: fontWeight.full,
        height: "auto",
        color: color.Black
    },
    fiveLow: {
        fontSize: fontSize.font5,
        fontWeight: fontWeight.low,
        height: "auto",
        color: color.Black
    },
    fiveNormal: {
        fontSize: fontSize.font5,
        fontWeight: fontWeight.normal,
        height: "auto",
        color: color.Black
    },
    fiveSemi: {
        fontSize: fontSize.font5,
        fontWeight: fontWeight.semi,
        height: "auto",
        color: color.Black
    },
    fiveBold: {
        fontSize: fontSize.font5,
        fontWeight: fontWeight.bold,
        height: "auto",
        color: color.Black
    },
    fiveFull: {
        fontSize: fontSize.font5,
        fontWeight: fontWeight.full,
        height: "auto",
        color: color.Black
    },
    fourLow: {
        fontSize: fontSize.font4,
        fontWeight: fontWeight.low,
        // height: "auto",
    },
    fourNormal: {
        fontSize: fontSize.font4,
        fontWeight: fontWeight.normal,
        // height: "auto",
    },
    fourSemi: {
        fontSize: fontSize.font4,
        fontWeight: fontWeight.semi,
    },
    fourBold: {
        fontSize: fontSize.font4,
        fontWeight: fontWeight.bold,
    },
    fourFull: {
        fontSize: fontSize.font4,
        fontWeight: fontWeight.full,
    },
    threeLow: {
        fontSize: fontSize.font3,
        fontWeight: fontWeight.low,
        // height: "auto",
    },
    threeNormal: {
        fontSize: fontSize.font3,
        fontWeight: fontWeight.normal,
        // height: "auto",
    },
    threeSemi: {
        fontSize: fontSize.font3,
        fontWeight: fontWeight.semi,
    },
    threeBold: {
        fontSize: fontSize.font3,
        fontWeight: fontWeight.bold,
    },
    threeFull: {
        fontSize: fontSize.font3,
        fontWeight: fontWeight.full,
    },
    // text aligner
    txtCenter: {
        textAlign: 'center'
    },
    txtSolidUnderLine: {
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    },
    txtDottedUnderLine: {
        textDecorationStyle: 'dotted',
        textDecorationLine: 'underline'
    },
    // text color
    txtBlue: {
        color: color.Blue,
    },
    txtGreen: {
        color: color.Green,
    },
    txtGold: {
        color: color.Gold,
    },
    txtLilac: {
        color: color.Lilac
    },
    txtWhite: {
        color: color.White,
    },
    txtBlack: {
        color: color.Black,
    },
    txtRed: {
        color: color.Red
    },
    // button/touchable's opacity
    activeOpacity: 0.8,
    card: {
        backgroundColor: color.White,
        width: wp(92),
        padding: wp(2.5),
        borderRadius: wp(2),
        alignSelf: "center",
        elevation: 2,
        shadowColor: "#c5c4c4",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        // borderWidth: wp(1)
    },
    Minicard: {
        backgroundColor: color.Blue,
        marginLeft: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: wp(2),

    },
    regularShadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 7,
    },
    smallBold: {
        fontSize: wp(2),
        fontWeight: "700",
        lineHeight: wp(4),
        height: "auto",
    },
    shadow: {
        elevation: 2,
        shadowColor: "#c5c4c4",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.90,
        shadowRadius: 10,
        // width: wp(92),
        // padding: wp(2.5),
        borderRadius: wp(1),
    },
    attribution: {
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        height: "100%",
    },
})