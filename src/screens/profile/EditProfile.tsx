import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    Pressable
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '../../components/TextInput';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';


const EditProfile = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('example@gmail.com');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
            <Header title='Edit Profile' goBack={() => navigation.goBack()} />
            <TouchableOpacity style={{ alignSelf: 'center', marginTop: hp(4) }}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
            <Text style={styles.name}>Faraz</Text>
            <Text style={styles.about}>About profile</Text>
            <Pressable onPress={() => setShowEmailModal(true)}>
                <View pointerEvents="none">
                    <InputField
                        value={email}
                        placeholder="Enter your email"
                        leftIcon="email"
                        keyboardType="email-address"
                        rightIcon="account-edit-outline"
                    />
                </View>
            </Pressable>
            <Pressable onPress={() => setShowPasswordModal(true)}>
                <View pointerEvents="none">
                    <InputField
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        leftIcon="lock"
                        keyboardType="default"
                        rightIcon="account-edit-outline"
                    />
                </View>
            </Pressable>

            <View style={styles.logoutBtn}>
                <Button title='Logout' backgroundColor={color.Default} onPress={() => setShowLogoutModal(true)} />
            </View>

            {/* Email Modal */}
            <Modal animationType="slide" transparent visible={showEmailModal} onRequestClose={() => setShowEmailModal(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.title}>Email</Text>

                        <Text style={styles.label}>New Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                        />

                        <Button title='Save Changes' backgroundColor={color.Default} onPress={() => setShowEmailModal(false)} />
                    </View>
                </View>
            </Modal>

            {/* Password Modal */}
            <Modal animationType="slide" transparent visible={showPasswordModal} onRequestClose={() => setShowPasswordModal(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.title}>Password</Text>

                        <Text style={styles.label}>Old Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter"
                            placeholderTextColor="#848484"
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="Enter"
                            placeholderTextColor="#848484"
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Enter"
                            placeholderTextColor="#848484"
                            keyboardType="email-address"
                        />
                        <Button title='Save Changes' backgroundColor={color.Default} onPress={() => setShowPasswordModal(false)} />
                    </View>
                </View>
            </Modal>

             {/* Logout Modal */}
            <Modal animationType="slide" transparent visible={showLogoutModal} onRequestClose={() => setShowLogoutModal(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.logoutTitle}>Confirmation!</Text>

                        <Text style={styles.logoutDescrip}>Are you agree to logout?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
                            <Button title='Yes' backgroundColor="#FF9C38" style={styles.yesBtn} onPress={() => setShowLogoutModal(false)} />
                            <Button title='Cancel' backgroundColor={'#FFFFFF'} style={styles.cancelBtn} textStyle={{ color: '#FF9C38' }} onPress={() => setShowLogoutModal(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('4%'),
        backgroundColor: color.White,
    },
    avatar: {
        width: wp('28%'),
        height: wp('28%'),
        borderRadius: wp('50%'),
        backgroundColor: '#f1f1f1',
    },
    name: {
        fontSize: 24,
        fontFamily: 'DM Sans',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: hp(1),
    },
    about: {
        fontSize: 18,
        fontFamily: 'DM Sans',
        fontWeight: '400',
        textAlign: 'center',
        color: color.Default,
        marginBottom: hp(1),
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
        color: '#FF9C38',
    },
    logoutDescrip: {
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'DM Sans',
        marginBottom: hp('2%'),
        textAlign: 'center',
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
    logoutBtn: {
        flex: 1,
        position: 'absolute',
        bottom: '10%',
        width: '100%',
        alignSelf: 'center'
    },
    cancelBtn: { 
        width: '45%', 
        paddingVertical: hp(1.2), 
        borderColor: '#FF9C38', 
        borderWidth:1 
    },
    yesBtn: { 
        width: '45%', 
        paddingVertical: hp(1.2)
    },
})