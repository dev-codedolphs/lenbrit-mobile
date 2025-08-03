import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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

const NewPassword = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<AuthNavigationProp>();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const handleResetPassword = () => {
        if (password !== confirmPassword) {
            return Alert.alert('Passwords do not match!');
        }
        const data: any = { password };
        dispatch(authSlice.actions.resetPassword(data));
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
                <Text style={styles.header}>New Password </Text>
                <Text style={styles.subHeader}>Your new password must be different from previously used password</Text>
                <InputField
                    label="PASSWORD"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    leftIcon="lock-outline"
                    keyboardType="default"
                    secureTextEntry={hidePassword}
                    rightIcon={hidePassword ? "eye-off-outline" : "eye-outline"}
                    onRightIconPress={() => setHidePassword(!hidePassword)}
                />

                <InputField
                    label="CONFIRM PASSWORD"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Re enter password to confirm"
                    leftIcon="lock-outline"
                    keyboardType="default"
                    secureTextEntry={hidePassword}
                    rightIcon={hidePassword ? "eye-off-outline" : "eye-outline"}
                    onRightIconPress={() => setHidePassword(!hidePassword)}
                />
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={handleResetPassword} title='Create New Password' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default NewPassword

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
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 15,
        fontWeight: '400',
        marginTop: hp(0.4),
        textAlign: 'center',
    },
})