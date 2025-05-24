import { FlatList, Modal, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Header from '../../components/Header'
import { DeleteIcon, NotificationFilled } from '../../assets/icons'
import Button from '../../components/Button'
import { color } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParamList } from '../../navigation/MainStack'

interface Item {
    id: number;
    message: string;
}

const notifications: Item[] = [
    { id: 1, message: 'Lorem notificatins here you can check' },
    { id: 2, message: 'Lorem notificatins here you can check' },
    { id: 3, message: 'Lorem notificatins here you can check' },
    { id: 4, message: 'Lorem notificatins here you can check' },
    { id: 5, message: 'Lorem notificatins here you can check' },
]

const NotificationsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);


    const renderedItem = ({ item }: { item: Item }) => (
        <View style={styles.itemWrapper}>
            <View style={styles.notificationContainer}>
                <NotificationFilled />
                <Text style={styles.notificationText}>{item.message}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                <DeleteIcon />
            </TouchableOpacity>
        </View>
    )

    const handleDelete = () => {
        setShowDeleteModal(false)
        navigation.navigate('DeleteNotificationSuccess')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title='Notifications' goBack={() => navigation.navigate('Tabs', { screen: 'Home' })} />
                <FlatList
                    data={notifications}
                    keyExtractor={(item): any => item.id}
                    renderItem={renderedItem}
                />
            </View>
            <Modal animationType="slide" transparent visible={showDeleteModal} onRequestClose={() => setShowDeleteModal(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.logoutTitle}>Confirmation!</Text>

                        <Text style={styles.logoutDescrip}>Are you agree to logout?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                                <MaterialIcons name='delete-outline' color={color.White} size={20} />
                                <Text style={styles.deleteBtnTitle}>Delete</Text>
                            </TouchableOpacity>
                            <Button title='Cancel' backgroundColor={'#FFFFFF'} style={styles.cancelBtn} textStyle={{ color: '#000' }} onPress={() => setShowDeleteModal(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('4%'),
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
        borderWidth: 0.5,
        borderColor: '#C5C5C5',
        borderRadius: 8,
        marginBottom: hp(2)
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationText: {
        marginLeft: wp(5),
        fontSize: 12,
        fontWeight: '400',
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
})