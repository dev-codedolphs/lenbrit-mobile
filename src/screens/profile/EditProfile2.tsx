import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '../../components/TextInput';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CameraModal } from '../../components/profile/CameraModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '../../components/Button';
import userApi from '../redux/Api'
import userSlice from '../redux/Slice';
import authSlice from '../auth/redux/Slice';
import Toast from 'react-native-toast-message';


const EditProfile2 = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { user, loading, success } = useSelector((state: any) => state.auth);

    const [firstName, setFirstName] = useState(user?.firstName ?? '');
    const [lastName, setLastName] = useState(user?.lastName ?? '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
    const [city, setCity] = useState(user?.city ?? '');
    const [address, setAddress] = useState(user?.address ?? '');

    const [profileImage, setProfileImage] = useState(user?.profileImage ?? null);
    const [cnicFrontImage, setCnicFrontImage] = useState(user?.cnicFrontImage ?? null);
    const [cnicBackImage, setCnicBackImage] = useState(user?.cnicBackImage ?? null);

    const modalRef = useRef<BottomSheetModal | null>(null);
    const [selectedType, setSelectedType] = useState<'profile' | 'cnicFront' | 'cnicBack' | null>(null);

    useEffect(() => {
        if (success) {
            Toast.show({
                type: 'success',
                text1: 'User updated successfully',
                topOffset: 20,
                visibilityTime: 3000,
                position: 'bottom',
            });
        }
    }, [success])

    const openModal = (type: 'profile' | 'cnicFront' | 'cnicBack') => {
        setSelectedType(type);
        modalRef.current?.present();
    };

   
    const handleSetPicture = async (fileData: any) => {
        try {
            // Upload to S3 via API helper
            const uploadedUrl = await userApi.uploadImageToServer(fileData);
            if (!uploadedUrl) {
                Alert.alert('Error', 'Failed to upload image');
                return;
            }

            if (selectedType === 'profile') setProfileImage(uploadedUrl);
            if (selectedType === 'cnicFront') setCnicFrontImage(uploadedUrl);
            if (selectedType === 'cnicBack') setCnicBackImage(uploadedUrl);
        } catch (err) {
            console.log('Upload error:', err);
        }
    };

    const handleSubmit = () => {
        const body = {
          firstName,
          lastName,
          phoneNumber,
          profileImage,
          city,
          address,
          cnicFrontImage,
          cnicBackImage,
        };
        
        dispatch(authSlice.actions.updateUserInfo(body as any));
      };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title="Edit Profile" goBack={() => navigation.goBack()} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: hp(2) }}>
                    {/* Profile Avatar */}
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity onPress={() => openModal('profile')} style={{ alignSelf: 'center',  }}>
                            <Image
                                source={
                                    user?.profileImage
                                        ? { uri: user.profileImage }
                                        : require('../../assets/images/default.jpg')
                                }
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.cameraButton} onPress={() => openModal('profile')}>
                                <MaterialCommunityIcons name="camera" size={20} color="#fff" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <Text style={styles.name}>
                            {user?.firstName ?? 'Faraz'} {user?.lastName ?? 'Ahmad'}
                        </Text>
                        <Text style={styles.about}>{user?.email ?? '@example.com'}</Text>
                    </View>

                    {/* Form Card */}
                    <View style={styles.card}>
                        <InputField
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="First Name"
                            leftIcon="account"
                        />
                        <InputField
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Last Name"
                            leftIcon="account"
                        />
                        <InputField
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Phone Number"
                            leftIcon="phone"
                            keyboardType="phone-pad"
                        />
                        <InputField
                            value={city}
                            onChangeText={setCity}
                            placeholder="City"
                            leftIcon="city"
                        />
                        <InputField
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Address"
                            leftIcon="home"
                        />

                        {/* CNIC Images */}
                        <View style={styles.cnicRow}>
                            {/* Front */}
                            <TouchableOpacity style={styles.cnicBox} onPress={() => openModal('cnicFront')}>
                                {cnicFrontImage ? (
                                    <Image source={{ uri: cnicFrontImage }} style={styles.cnicImage} />
                                ) : (
                                    <View style={[styles.cnicImage, styles.uploadBox]}>
                                        <MaterialCommunityIcons name="cloud-upload-outline" size={32} color={color.Gray} />
                                    </View>
                                )}
                                <Text style={styles.cnicLabel}>CNIC Front</Text>
                            </TouchableOpacity>

                            {/* Back */}
                            <TouchableOpacity style={styles.cnicBox} onPress={() => openModal('cnicBack')}>
                                {cnicBackImage ? (
                                    <Image source={{ uri: cnicBackImage }} style={styles.cnicImage} />
                                ) : (
                                    <View style={[styles.cnicImage, styles.uploadBox]}>
                                        <MaterialCommunityIcons name="cloud-upload-outline" size={32} color={color.Gray} />
                                    </View>
                                )}
                                <Text style={styles.cnicLabel}>CNIC Back</Text>
                            </TouchableOpacity>
                        </View>

                        <CameraModal
                            modalRef={modalRef}
                            setPicture={handleSetPicture}
                            onChancel={() => modalRef.current?.dismiss()}
                        />
                    </View>
                    <Button
                        loading={loading}
                        backgroundColor={color.Default}
                        title="Update"
                        onPress={() => handleSubmit()}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp('4%'),
    },
    avatarContainer: {
        backgroundColor: color.White,
        borderRadius: wp(4),
        paddingVertical: hp(2.5),
    },
    avatar: {
        width: wp('24%'),
        height: wp('24%'),
        borderRadius: wp('50%'),
        backgroundColor: '#f1f1f1',
    },
    cameraButton: {
        position: 'absolute',
        bottom: -hp(1.5),
        alignSelf: 'center',
        backgroundColor: color.Black,
        borderRadius: 20,
        padding: 6,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: hp(2),
        color: color.Black,
    },
    about: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: color.Gray,
    },
    card: { 
        backgroundColor: '#fff', 
        borderRadius: 12, 
        padding: wp('4%'), 
    },
    cnicRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2),
    },
    cnicBox: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cnicImage: {
        width: '100%',
        height: hp(12),
        borderRadius: 8,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBox: {
        borderWidth: 1,
        borderColor: color.Gray,
    },
    cnicLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
        color: color.Gray,
    },
});
