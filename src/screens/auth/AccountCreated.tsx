import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Button from '../../components/Button'
import { color } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { SuccessIcon } from '../../assets/icons'
import { AuthNavigationProp } from '../../types/navigation'

const AccountCreated = () => {
    const navigation = useNavigation<AuthNavigationProp>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
            <View style={styles.container}>
                <SuccessIcon />
                <Text style={styles.header}>Your account has been created </Text>
                <Text style={styles.subHeader}>Login to your account and start using the Lenbrit application for lending and renting accessories and many more things! </Text>
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={() => navigation.navigate('Login')} title='Next' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default AccountCreated

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
        textAlign:'center',
    },
    subHeader: {
        fontSize: 15,
        fontWeight: '400',
        marginTop: hp(0.4),
        textAlign: 'center',
    },

})