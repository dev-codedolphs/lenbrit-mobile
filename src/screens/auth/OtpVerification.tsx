import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather';
import * as space from '../../utils/spacer';
import { OtpInput } from "react-native-otp-entry";
import { color } from '../../theme/colors';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthNavigationProp } from '../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from './redux/Slice';

const OtpVerification = () => {
    const navigation = useNavigation<AuthNavigationProp>();
    const { isVerified } = useSelector((state:any) => state.auth);
    const route = useRoute();
    const dispatch = useDispatch();
    const { email } = route.params as { email: string };
    const [otp, setOtp] = useState('');

    const handleOtpVerification = () => {
        const data: any = {
            email,
            otp,
        };

        dispatch(authSlice.actions.verifyEmailPhone(data));
        if (isVerified) {
            navigation.navigate('AccountCreated')
        }
    };

    const handleResendOtp = () => {
        const data:any = { email }
        dispatch(authSlice.actions.resendOTP(data));
    }

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
                    numberOfDigits={5}
                    focusColor={color.Default}
                    placeholder="----"
                    type="numeric"
                    onTextChange={(text) => setOtp(text)}
                    onFilled={(text) => setOtp(text)}
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
                <space.s4 />
                <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center'}}>Didn't receive OTP?</Text>
                <TouchableOpacity onPress={handleResendOtp}>
                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', textDecorationLine: 'underline'}}>Resend code</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={handleOtpVerification} title='Next' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default OtpVerification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(2),
        paddingHorizontal: wp(4),
        backgroundColor: color.White,
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