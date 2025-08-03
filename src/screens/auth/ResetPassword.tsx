import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather';
import * as space from '../../utils/spacer';
import { color } from '../../theme/colors';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/TextInput';
import { AuthNavigationProp } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import authSlice from './redux/Slice';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<AuthNavigationProp>();
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        const data: any = { email };
        dispatch(authSlice.actions.forgotPassword(data));
        if (true) {
            navigation.navigate('ResetPasswordSuccess')
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: hp(0.5) }}>
                    <Icon name='arrow-left' size={24} />
                </TouchableOpacity>
                <space.s6 />
                <Text style={styles.header}>Reset your password </Text>
                <Text style={styles.subHeader}>Please enter your email address to request a password reset</Text>
                <InputField
                    label="EMAIL"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    leftIcon="email-outline"
                    keyboardType="email-address"
                />
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={handleResetPassword} title='Next' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default ResetPassword

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
})