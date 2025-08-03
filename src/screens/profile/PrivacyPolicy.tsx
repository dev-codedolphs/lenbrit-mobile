import React from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors'; // Adjust path to your color theme
import Header from '../../components/Header';

const PrivacyPolicy = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header title='Privacy Policy' goBack={() => navigation.goBack()} style={{ paddingHorizontal: wp(4), paddingTop: hp(1)}} />

            {/* Scrollable Content */}
            <ScrollView style={styles.content}>
                <Text style={styles.paragraph}>
                    Welcome to Borrow It, a platform designed to help users lend and borrow daily-use and event-specific items with ease and trust.
                </Text>
                <Text style={styles.paragraph}>
                    This Privacy Policy outlines how we collect, use, share, and protect your information when you use our mobile application and services.
                </Text>

                <Text style={styles.paragraph}>
                    🔐 1. Information We Collect
                </Text>
                <Text style={styles.paragraph}>
                    a. Personal Information
                </Text>
                <Text style={styles.paragraph}>
                    We may collect the following details when you register or use the app:
                </Text>


                <Text style={[styles.paragraph, styles.bulletPoint]}>
                    {'\u2022'} Full Name{'\n'}
                    {'\u2022'} Phone Number{'\n'}
                    {'\u2022'} Email Address{'\n'}
                    {'\u2022'} CNIC (optional for verification){'\n'}
                    {'\u2022'} Payment details (JazzCash, Easypaisa, Bank account, etc.)
                </Text>

                <Text style={styles.paragraph}>
                    b. Item & Listing Information
                </Text>

                <Text style={[styles.paragraph, styles.bulletPoint]}>
                    {'\u2022'} Item descriptions, photos, videos, pricing, availability
                </Text>
                
                <Text style={styles.paragraph}>
                  c. Usage Information
                </Text>
                <Text style={[styles.paragraph, styles.bulletPoint]}>
                    {'\u2022'} Device type, operating system, and location (if enabled){'\n'}
                    {'\u2022'} User activity logs (items viewed, orders made, chats initiated)
                </Text>

                <Text style={styles.paragraph}>
                💡 2. How We Use Your Information
                We use your data to:
                </Text>
                <Text style={[styles.paragraph, styles.bulletPoint]}>
                    {'\u2022'} Create and manage your user account{'\n'}
                    {'\u2022'} Facilitate transactions between lenders and borrowers{'\n'}
                    {'\u2022'} Display personalized item suggestions{'\n'}
                    {'\u2022'} Notify you about order updates, approvals, and offers{'\n'}
                    {'\u2022'} Process payments and withdrawals{'\n'}
                    {'\u2022'} Enhance app security and performance
                </Text>

                <Text style={styles.paragraph}>
                🔁 3. Sharing Your Information
                We do not sell your personal information. However, we may share it:
                </Text>
                <Text style={[styles.paragraph, styles.bulletPoint]}>
                    {'\u2022'} With the other party in a transaction (borrower/lender) for order coordination{'\n'}
                    {'\u2022'} With payment service providers for secure transaction processing{'\n'}
                    {'\u2022'} With law enforcement or legal bodies if required by law
                </Text>

                <Text style={styles.paragraph}>
                    📬 4. Notifications & Communications
                    We may send you:
                </Text>
                <Text style={[styles.paragraph, styles.bulletPoint]}>
                    {'\u2022'} Transaction updates (offers, approvals, returns){'\n'}
                    {'\u2022'} Promotional offers (you can opt out anytime){'\n'}
                    {'\u2022'} Important security or policy changes
                </Text>

                <Text style={styles.paragraph}>
                    🔒 5. Data Security {'\n'}
                    We implement industry-standard encryption and secure servers to protect your information. However, no method of transmission is 100%
                </Text>

                <Text style={styles.paragraph}>
                    🧽 6. Data Retention {'\n'}
                    We retain your personal and transaction data as long as your account is active or as needed to fulfill legal obligations.
                </Text>

                <Text style={styles.paragraph}>
                    🧑‍💻 7. User Rights
                    You can:
                </Text>
                <Text style={[styles.paragraph, styles.bulletPoint]}>
                    {'\u2022'} Update or delete your account information from your profile{'\n'}
                    {'\u2022'} Request deletion of your data by contacting us at [Insert Email]{'\n'}
                    {'\u2022'} Important security or policy changes
                </Text>

                <Text style={styles.paragraph}>
                🌍 8. Children’s Privacy {'\n'}
                Borrow It is not intended for users under the age of 13. We do not knowingly collect data from minors.
                </Text>

                <Text style={styles.paragraph}>
                📞 9. Contact Us {'\n'}
                    If you have questions about this Privacy Policy, please contact:{'\n'}
                    Email: support@borrowit.pk
                    Phone: +92XXXXXXXXX
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
    },
    content: {
        paddingHorizontal: wp('4%'),
    },
    paragraph: {
        fontSize: hp('1.8%'),
        color: '#444',
        marginBottom: hp('0.2%'),
        lineHeight: hp('2.8%'),
    },
    bulletPoint: {
        paddingLeft: wp('3%'),
    }
});
