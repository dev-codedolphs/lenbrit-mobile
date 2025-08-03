import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../theme/colors'; // adjust as per your structure
import Icon from 'react-native-vector-icons/Ionicons';
import { EasyPaisaIcon } from '../../assets/icons';
import { useDispatch } from 'react-redux';
import userSlice from '../redux/Slice';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

const paymentMethods = [
    {
        id: 'cash',
        title: 'Cash on Delivery',
        logo: EasyPaisaIcon,
        user: 'Faraz',
    },
    {
        id: 'easypaisa',
        title: 'EasyPaisa',
        logo: EasyPaisaIcon,
        user: 'Faraz',
    },
    {
        id: 'jazzcash',
        title: 'Jazz Cash',
        logo: EasyPaisaIcon,
        user: 'Faraz',
    },
    {
        id: 'bankalfalah',
        title: 'Bank Alfalah',
        logo: EasyPaisaIcon,
        user: 'Faraz',
    },
];

const AddressScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selectedMethod, setSelectedMethod] = useState('easypaisa');
    const [primary, setPrimary] = useState(true);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleCreateOrder = () => {
        const newShippingAddress = {
            fullName: name,
            address,
            country,
            city,
            phoneNumber: phone,
        };

        dispatch(userSlice.actions.createOrder({ newShippingAddress }));
        (navigation as any).navigate('OrederPlacedSuccess')
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Header title="Address" goBack={() => navigation.goBack()} />

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />

                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, styles.half]}
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                    />
                    <TextInput
                        style={[styles.input, styles.half]}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType='phone-pad'
                    value={phone}
                    onChangeText={setPhone}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />

                <View style={styles.switchRow}>
                    <Text style={styles.label}>Save as primary address</Text>
                    <Switch value={primary} onValueChange={setPrimary} />
                </View>

                <TouchableOpacity>
                    <Text style={styles.depositText}>Security Deposit (50%)</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Payment Method</Text>
                {paymentMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.paymentOption,
                            selectedMethod === method.id && styles.selectedPayment,
                        ]}
                        onPress={() => setSelectedMethod(method.id)}
                    >
                        <EasyPaisaIcon />
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentTitle}>{method.title}</Text>
                            <Text style={styles.paymentUser}>{method.user}</Text>
                        </View>
                        {selectedMethod === method.id && (
                            <Icon name="checkmark-circle" color="#A020F0" size={20} />
                        )}
                    </TouchableOpacity>
                ))}

                <Button title='Proceed' backgroundColor={color.Default} onPress={handleCreateOrder} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    container: { padding: 20 },
    backBtn: { marginBottom: 10 },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#F1F1F1',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    half: { width: '48%' },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 8,
    },
    depositText: {
        color: '#A020F0',
        fontWeight: '500',
        marginBottom: 16,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },
    selectedPayment: {
        borderColor: '#A020F0',
        borderWidth: 1.5,
    },
    paymentLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    paymentInfo: {
        flex: 1,
        marginLeft: 12,
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    paymentUser: {
        fontSize: 14,
        color: '#666',
    },
    proceedButton: {
        backgroundColor: '#A020F0',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    proceedText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
