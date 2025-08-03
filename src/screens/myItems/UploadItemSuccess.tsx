import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Button from '../../components/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { color } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { SuccessIcon } from '../../assets/icons'
import { MainStackParamList } from '../../navigation/MainStack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const UploadItemSuccess = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
            <View style={styles.container}>
                <SuccessIcon />
                <Text style={styles.header}>Thank You! Your Item Has Been Submitted</Text>
                <Text style={styles.subHeader}>Your listing is now under review by our team. Once approved, you’ll receive a notification and your item will be visible to renters. </Text>
            </View>
            <View style={{ padding: wp(2), backgroundColor: color.White }}>
                <Button onPress={() => navigation.navigate('Tabs', {screen: 'Home'})} title='Back To Home' backgroundColor={color.Default} style={{ width: '94%' }} />
            </View>
        </SafeAreaView>
    )
}

export default UploadItemSuccess

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
        fontSize: 12,
        fontWeight: '500',
        marginTop: hp(0.4),
        textAlign: 'center',
        color: '#8E8E8E',
    },
})