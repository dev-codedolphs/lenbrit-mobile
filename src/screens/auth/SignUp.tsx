import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useMemo } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import * as space from '../../utils/spacer';
import InputField from '../../components/TextInput';
import Button from '../../components/Button';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import authSlice from './redux/Slice';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<AuthNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [role, setRole] = useState<'BORROWER' | 'LENDER'>('BORROWER');

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

    const handleSignup = () => {
        // Validate password
        if (password !== confirmPassword) {
            return Alert.alert('Passwords do not match!');
        }

        const data: any = {
            email,
            password,
            role,
        };

        // Dispatch signup action
        dispatch(authSlice.actions.signup(data));
        navigation.navigate('OtpVerification', { email })
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'padding'}
                keyboardVerticalOffset={hp(2)} // adjust as needed
            >
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: hp(0) }}>
                    <Icon name='arrow-left' size={24} />
                </TouchableOpacity>
                {/* <Image style={styles.logo} source={require('../../assets/icons/logo.png')} /> */}
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
                    label="NAME"
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
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

                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Sign Up as Lender</Text>
                    <Switch
                        value={role === 'LENDER'}
                        onValueChange={(val) => setRole(val ? 'LENDER' : 'BORROWER')}
                        thumbColor={color.Default}
                        trackColor={{ false: '#ccc', true: color.Default }}
                    />
                </View>

                {/* Password Strength Bar */}
                {
                    password.length > 1 &&
                    <>
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
                    </>
                }
                <space.s1 />
            </ScrollView>
            </KeyboardAvoidingView>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={handleSignup} title='Next' backgroundColor={color.Default} style={{ width: '94%'}} />
            </View>
        </SafeAreaView>
    );
};

export default SignUp;

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
        marginVertical: hp(2),
        textAlign: 'center',
    },
    strengthBarRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: hp(0.5),
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
        marginTop: -30,
        resizeMode: 'contain',
        alignSelf: 'center',
      },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(2),
        marginBottom: hp(1),
        paddingVertical: wp(3),
        paddingLeft: wp(3),
        borderRadius: wp(2),
        borderColor: '#ccc',
        borderWidth: 1,
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: color.Black,
    },
});
