import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CountryFlag from 'react-native-country-flag';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { DropDown } from '../../assets/icons/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

const AddPaymentMethod = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const [bank, setBank] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [vcc, setVcc] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [country, setCountry] = useState('Pakistan');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
            <View style={styles.container}>
                <Header title="Add Payment Methods" goBack={() => navigation.goBack()} />

                <Text style={styles.sectionTitle}>Bank Details</Text>

                <TouchableOpacity style={styles.inputRow}>
                    <Text style={styles.placeholder}>{bank || 'Bank'}</Text>
                    <DropDown />
                </TouchableOpacity>

                <View style={styles.inputRow}>
                    <TextInput
                        placeholder="Card number"
                        placeholderTextColor="#999"
                        style={styles.input}
                        keyboardType="numeric"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                    />
                    <Image
                        source={require('../../assets/icons/mastercard.png')}
                        style={styles.cardIcon}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.row}>
                    <TextInput
                        placeholder="Expiry date"
                        placeholderTextColor="#999"
                        style={[styles.input, styles.halfInput]}
                        value={expiry}
                        onChangeText={setExpiry}
                    />
                    <TextInput
                        placeholder="VCC"
                        placeholderTextColor="#999"
                        style={[styles.input, styles.halfInput]}
                        value={vcc}
                        onChangeText={setVcc}
                    />
                </View>

                <TextInput
                    placeholder="Card holder"
                    placeholderTextColor="#999"
                    style={styles.inputRow}
                    value={cardHolder}
                    onChangeText={setCardHolder}
                />

                <TouchableOpacity style={styles.inputRow}>
                    <View style={styles.countryWrapper}>
                        <CountryFlag isoCode="PK" size={18} />
                        <Text style={styles.countryText}>{country}</Text>
                    </View>
                    <DropDown />
                </TouchableOpacity>

                <View style={styles.buttonWrapper}>
                    <Button
                        title="Add wallet"
                        backgroundColor="#A200E6"
                        icon={<Icon name="plus-circle" size={24} color="#fff" />}
                        onPress={() => navigation.navigate('PaymentSuccess')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'DM Sans',
        marginBottom: hp('2%'),
        color: color.Black,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.8%'),
        marginBottom: hp('2%'),
        backgroundColor: '#FAFAFA',
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
    },
    placeholder: {
        color: '#999',
        fontSize: 14,
    },
    cardIcon: {
        width: 30,
        height: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    halfInput: {
        width: '48%',
        backgroundColor: '#FAFAFA',
        paddingVertical: hp('1.8%'),
        paddingHorizontal: wp('4%'),
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: hp('2%'),
    },
    countryWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
    },
    countryText: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'DM Sans',
        
    },
    buttonWrapper: {
        marginTop: hp('2%'),
    },
});
