import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ModalProps {
    visible: boolean;
    children: React.ReactNode; // Render dynamic content inside the modal
}

const GenericModal: React.FC<ModalProps> = ({ visible, children }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {/* Render the children passed to this modal */}
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: wp('80%'),
        padding: wp(5),
        backgroundColor: color.White,
        borderRadius: wp(3),
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 5 },
    },
    closeButton: {
        marginTop: hp(2),
        padding: wp(2),
        backgroundColor: color.Red,
        borderRadius: wp(2),
    },
    closeButtonText: {
        color: color.White,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default GenericModal;
