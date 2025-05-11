import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather';
import * as space from '../../utils/spacer';
import { OtpInput } from "react-native-otp-entry";
import { color } from '../../theme/colors';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../types/navigation';

const OtpVerification = () => {
    const navigation = useNavigation<AuthNavigationProp>();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: hp(0.5) }}>
                    <Icon name='arrow-left' size={24} />
                </TouchableOpacity>
                <space.s6 />
                <Text style={styles.header}>Enter OTP for verification </Text>
                <Text style={styles.subHeader}>We’ve send you the verification code on abc@gmail.com</Text>
                <space.s4 />
                <OtpInput
                    numberOfDigits={4}
                    focusColor={color.Default}
                    placeholder="----"
                    type="numeric"
                    onTextChange={(text) => console.log(text)}
                    onFilled={(text) => console.log(`OTP is ${text}`)}
                    textInputProps={{
                        accessibilityLabel: "One-Time Password",
                    }}
                    textProps={{
                        accessibilityRole: "text",
                        accessibilityLabel: "OTP digit",
                        allowFontScaling: false,
                    }}
                    theme={{
                        containerStyle: styles.otpContainer,
                        pinCodeContainerStyle: styles.pinCodeContainer,
                    }}
                />
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={() => navigation.navigate('AccountCreated')} title='Next' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default OtpVerification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp(2),
        marginHorizontal: wp(4),
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
    },
    subHeader: {
        fontSize: 15,
        fontWeight: '400',
        marginTop: hp(0.4),
    },
    pinCodeContainer: {
        width: 55,
        height: 55,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpContainer: {
        paddingHorizontal: wp(4),
    }
})