import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { color } from '../../theme/colors'
import Header from '../../components/Header'
import Button from '../../components/Button'
import * as space from '../../utils/spacer'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParamList } from '../../navigation/MainStack'

const Earnings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const [amount, setAmount] = useState('');
    const [showWithDrawModal, setShowWithdrawModal] = useState(false);

    const handleWithdrawPress = () => {
        setShowWithdrawModal(false)
        navigation.navigate('WithdrawSuccess')
    }

    const selectPaymentMethod = () => {
        setShowWithdrawModal(false)
        navigation.navigate('PaymentMethods')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title='Earnings' goBack={() => navigation.goBack()} />
                <space.s2 />

                {/* Cards */}
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Available for Withdrawl</Text>
                    <Text style={styles.cardAmount}>PKR 20,560</Text>
                    <Button title='Withdraw Now' backgroundColor={color.Default} onPress={() => setShowWithdrawModal(true)} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>From current orders</Text>
                    <Text style={styles.cardAmount}>PKR 10,589</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Total Earnings</Text>
                    <Text style={styles.cardAmount}>PKR 1,090,589</Text>
                </View>

            </View>
            
            {/* withdraw modal */}
            <Modal animationType="slide" transparent visible={showWithDrawModal} onRequestClose={() => setShowWithdrawModal(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.title}>Withdraw</Text>

                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            style={styles.input}
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="Enter"
                            placeholderTextColor="#aaa"
                            keyboardType="number-pad"
                        />
                        <Text style={styles.label}>Payment Method</Text>
                        <TouchableOpacity onPress={selectPaymentMethod}>
                            <View style={styles.input}>
                                <Text style={ styles.inputText }>
                                    Easypaisa
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Button title='Withdraw' backgroundColor={color.Default} onPress={handleWithdrawPress} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Earnings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: color.White,
    },
    card: {
        backgroundColor: '#F9F9F9',
        borderRadius: 4,
        paddingVertical: hp('2.5%'),
        paddingHorizontal: wp('8%'),
        marginBottom: hp('2%'),
        alignItems: 'center',
    },
    cardLabel: {
        fontSize: 14,
        color: '#999',
        fontWeight: '400',
        marginBottom: hp('1%'),
    },
    cardAmount: {
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'DM Sans',
        color: color.Black,
        marginBottom: hp('1.2%'),
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: wp('85%'),
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: wp('4%'),
        alignItems: 'center',
    },
    title: {
        fontSize: hp('2.2%'),
        fontWeight: '600',
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    inputText: {
        fontSize: 14,
        color: '#000',
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: hp('1%'),
        color: color.Black,
    },
    input: {
        width: '100%',
        borderRadius: 5,
        padding: wp('3%'),
        fontSize: 14,
        borderColor: '#D7D7D7',
        borderWidth: 1,
        marginBottom: hp('2%'),
    },
})