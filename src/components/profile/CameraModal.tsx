import React, { ForwardedRef, RefObject } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomModal } from '../basic/BottomModal';
import { color } from '../../theme/colors';
import Button from '../Button';

export function CameraModal({
    modalRef,
    setPicture,
    onChancel,
}: {
    modalRef?: RefObject<BottomSheetModal | null>;
    setPicture?: (fileData: any) => void;
    onChancel?: () => void;
}) {
    const handleCamera = async () => {
        modalRef?.current?.dismiss();
        const result: ImagePickerResponse = await launchCamera({
            mediaType: 'photo',
            includeBase64: false,
            quality: 0.7,
        });

        if (result?.assets && result.assets.length > 0) {
            setPicture?.(result.assets[0]);
        }
    };

    const handleGallery = async () => {
        modalRef?.current?.dismiss();
        const result: ImagePickerResponse = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            quality: 0.7,
        });

        if (result?.assets && result.assets.length > 0) {
            setPicture?.(result.assets[0]);
        }
    };

    const CameraButton = ({
        icon,
        label,
        onPress,
    }: {
        icon: string;
        label: string;
        onPress: () => void;
    }) => (
        <TouchableOpacity style={styles.cameraButton} onPress={onPress}>
            <View style={{ backgroundColor: '#F5F5F5', padding: wp(2), borderRadius: wp(10)}}>
            <MaterialCommunityIcons name={icon} size={20} />
            </View>
            <Text style={styles.cameraButtonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomModal modalRef={modalRef}>
            <View>
                <Text style={styles.description}>Select a photo for your profile</Text>

                <View style={styles.buttonsContainer}>
                    <CameraButton icon="camera-outline" label="Take Photo" onPress={handleCamera} />
                    <CameraButton icon="image-multiple" label="Choose from Gallery" onPress={handleGallery} />
                </View>

                <Button
                    backgroundColor=''
                    title="Cancel"
                    textStyle={{ color: color.Black, fontSize: 16 }}
                    style={{ borderColor: color.Gray, borderWidth: 1, borderRadius: wp(8) }}
                    onPress={onChancel}
                />
            </View>
        </BottomModal>
    );
}

const styles = StyleSheet.create({
    description: {
        fontSize: hp('2%'),
        color: color.Black,
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    buttonsContainer: {
        gap: hp('1.5%'),
        marginBottom: hp('2%'),
    },
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cameraButtonText: {
        marginLeft: wp('3%'),
        fontSize: hp('2%'),
        fontWeight: '500',
        color: color.Black,
    },
    button: {
        backgroundColor: color.White,
        borderWidth: 1,
        borderColor: color.Black,
    },
});
