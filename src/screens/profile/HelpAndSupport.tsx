import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { color } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { HelpSupport } from '../../assets/icons'
import { MainStackParamList } from '../../navigation/MainStack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Header from '../../components/Header'

const HelpAndSupport = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
            <Header title='Help & Support' goBack={() => navigation.goBack()} style={{ paddingHorizontal: wp(4), paddingTop: hp(1) }} />
            <View style={styles.container}>
                <HelpSupport />
                <Text style={[styles.paragraph, { marginTop: hp(6) }]}>If you have questions about this Privacy Policy, please contact:</Text>
                <Text style={styles.paragraph}>
                    Email: support@lembrit.pk{'\n'}
                    Phone: +92XXXXXXXXX
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default HelpAndSupport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(2),
        paddingHorizontal: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.White,
        gap: hp(2)
    },
    paragraph: {
        fontSize: hp('1.8%'),
        color: '#444',
        marginBottom: hp('0.2%'),
        lineHeight: hp('2.8%'),
        textAlign: 'center',
    },
})