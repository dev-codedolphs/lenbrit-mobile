import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { color } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'

const ResetPasswordSuccess = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
            <View style={styles.container}>
                <Image source={require('../../assets/icons/Success.png')} />
                <Text style={styles.header}>Password Reset Successful!</Text>
                <Text style={styles.subHeader}>Login to your account and start using the banquet hall application for event bookings, marriage halls and a lot more! </Text>
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={() => navigation.navigate('ResetPassword')} title='Next' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default ResetPasswordSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp(2),
        marginHorizontal: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginVertical: hp(2),
    },
    subHeader: {
        fontSize: 15,
        fontWeight: '400',
        marginTop: hp(0.4),
        textAlign: 'center',
    },
})