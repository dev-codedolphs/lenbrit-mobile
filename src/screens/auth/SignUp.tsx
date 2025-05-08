import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import * as space from '../../utils/spacer';
import InputField from '../../components/TextInput';
import Button from '../../components/Button';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    // Password validation logic
    const passwordChecks = useMemo(() => ({
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasMinLength: password.length >= 8,
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    }), [password]);

    const RuleItem = ({ text, passed, isRecommended = false }: { text: string; passed: boolean; isRecommended?: boolean }) => {
        return (
            <View style={styles.ruleItem}>
                <Text style={{ color: passed ? 'green' : isRecommended ? 'orange' : 'red' }}>
                    {passed ? '✓' : isRecommended ? '!' : '✕'} {text}
                </Text>
            </View>
        );
    };

    const passedChecksCount = Object.values(passwordChecks).filter(Boolean).length;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: hp(0.5) }}>
                    <Icon name='arrow-left' size={24} />
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/icons/logo.png')} />
                <Text style={styles.header}>Sign Up</Text>
                <Text style={styles.subHeader}>Enter your credentials to create a new account on the app</Text>

                <InputField
                    label="EMAIL"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    leftIcon="email-outline"
                    keyboardType="email-address"
                />

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

                {/* Password Strength Bar */}
                <View style={styles.strengthBarRow}>
                    <View style={styles.strengthBarWrapper}>
                        <View style={[styles.strengthBar, { width: `${(passedChecksCount / 4) * 100}%`, backgroundColor: passedChecksCount >= 3 ? 'green' : 'red' }]} />
                    </View>
                    <Text style={[styles.strengthText, { color: passedChecksCount >= 3 ? 'green' : 'red' }]}>
                        {passedChecksCount >= 3 ? 'Strong Password' : 'Weak Password'}
                    </Text>
                </View>
                

                {/* Rules */}
                <View style={styles.rulesWrapper}>
                    <RuleItem text="Use at least 1 lower case letter" passed={passwordChecks.hasLowercase} />
                    <RuleItem text="Use at least 1 number" passed={passwordChecks.hasNumber} />
                    <RuleItem text="Use at least 8 characters" passed={passwordChecks.hasMinLength} />
                    <RuleItem text="Use a special character (Recommended)" passed={passwordChecks.hasSpecialChar} isRecommended />
                </View>
                <space.s1 />
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={() => navigation.navigate('OtpVerification')} title='Next' backgroundColor={color.Default} style={{ width: '94%'}} />
            </View>
        </SafeAreaView>
    );
};

export default SignUp;

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
    strengthBarRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: hp(1),
        marginBottom: hp(0.5),
    },
    strengthBarWrapper: {
        width:'70%',
        flexDirection: 'row',
        justifyContent:'space-between',
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginTop: hp(1),
        marginBottom: hp(0.5),
        marginRight: wp(2),
    },
    strengthBar: {
        height: '100%',
        borderRadius: 5,
    },
    strengthText: {
        fontWeight: '600',
        fontSize: 12,
    },
    rulesWrapper: {
        marginTop: hp(0.5),
    },
    ruleItem: {
        marginVertical: 2,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
      },
});
