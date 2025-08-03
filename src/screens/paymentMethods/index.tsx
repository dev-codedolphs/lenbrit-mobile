import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

interface Wallet {
    id: string;
    name: string;
    user: string;
    logo: any;
}

const wallets: Wallet[] = [
    {
        id: '1',
        name: 'EasyPaisa',
        user: 'Faraz',
        logo: 'payment',
    },
    {
        id: '2',
        name: 'Jazz Cash',
        user: 'Faraz',
        logo: 'payment',
    },
    {
        id: '3',
        name: 'Bank Alfalah',
        user: 'Faraz',
        logo: 'payment',
    },
];

const PaymentMethods = () => {
      const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
        const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    
    const renderWallet = ({ item }: { item: Wallet }) => (
        <View style={styles.card}>
            <View style={styles.walletInfo}>
                <MaterialIcons name="paypal" size={22} color="#E90000" />
                <View style={{ marginLeft: wp(4)}}>
                    <Text style={styles.walletName}>{item.name}</Text>
                    <Text style={styles.userName}>{item.user}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                <MaterialIcons name="delete-outline" size={22} color="#E90000" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Header */}
                <Header title='Payment Methods' goBack={() => navigation.navigate('Earnings')} />

                {/* Wallets List */}
                <FlatList
                    data={wallets}
                    keyExtractor={(item) => item.id}
                    renderItem={renderWallet}
                    contentContainerStyle={{ paddingBottom: hp('2%') }}
                    ListFooterComponent={
                        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPaymentMethod')}>
                            <Icon name="plus" size={24} color="#fff" />
                            <Text style={styles.addText}>Add new wallet</Text>
                        </TouchableOpacity>
                    }
                />

                  {/* Delete Modal */}
            <Modal animationType="slide" transparent visible={showDeleteModal} onRequestClose={() => setShowDeleteModal(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.logoutTitle}>Confirmation!</Text>

                        <Text style={styles.logoutDescrip}>Are you agree to logout?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
                                <TouchableOpacity style={styles.deleteBtn} onPress={() => setShowDeleteModal(false)}>
                                    <MaterialIcons name='delete-outline' color={color.White} size={20} />
                                    <Text style={styles.deleteBtnTitle}>Delete</Text>
                                </TouchableOpacity>
                            <Button title='Cancel' backgroundColor={'#FFFFFF'} style={styles.cancelBtn} textStyle={{ color: '#000' }} onPress={() => setShowDeleteModal(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

            </View>
        </SafeAreaView>
    );
};

export default PaymentMethods;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('4%'),
    },
    card: {
        flexDirection: 'row',
        backgroundColor: color.White,
        padding: wp('4%'),
        marginBottom: hp('1.5%'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        // Android Shadow
        elevation: 5,
    },
    walletInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletName: {
        fontSize: 14,
        fontWeight: '500',
        color: color.Black,
    },
    userName: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: color.Default,
        paddingVertical: hp('1.8%'),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2%'),
    },
    addText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 8,
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
    logoutTitle: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'DM Sans',
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    logoutDescrip: {
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'DM Sans',
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    cancelBtn: {
        width: '45%',
        paddingVertical: hp(1.2),
        borderColor: '#B9B9B9',
        borderWidth: 1
    },
    deleteBtn: {
        width: '45%',
        paddingVertical: hp(1.2),
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 4, 
        backgroundColor: color.Red, 
        borderRadius: 8,
    },
    deleteBtnTitle: {
        fontFamily: 'DM Sans',
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
