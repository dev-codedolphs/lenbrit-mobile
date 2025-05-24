import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { MainStackParamList } from '../../navigation/MainStack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Button from '../../components/Button'
import { color } from '../../theme/colors'
import { SuccessIcon } from '../../assets/icons'

const DeleteNotificationSuccess = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
            <View style={styles.container}>
                <SuccessIcon />
                <Text style={styles.header}>Operation Completed!</Text>
                <Text style={styles.subHeader}>Your changes have been saved successfully.</Text>
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={() => navigation.navigate('NotificationsScreen')} title='Back To Home' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default DeleteNotificationSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(2),
        paddingHorizontal: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.White,
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'DM Sans',
        marginVertical: hp(2),
        textAlign: 'center',
        paddingHorizontal: wp(4),

    },
    subHeader: {
        fontSize: 20,
        fontWeight: '400',
        marginTop: hp(0.4),
        textAlign: 'center',
        color: '#1F1F1F',
    },
})