import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { ItemType, OrderItemType } from '../../types/types';
import Button from '../Button';
import { DeleteIcon } from '../../assets/icons';
import GenericModal from '../basic/Modal';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../screens/redux/Slice';
import Toast from 'react-native-toast-message';


interface ListingCardProps {
    item: any
    from: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, from }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const { success } = useSelector((state: any) => state.user);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (success) {
            setModalVisible(false)
            Toast.show({
                type: 'success',
                text1: 'Product added to cart successfully',
                topOffset: 20,
                visibilityTime: 3000,
                position: 'bottom',
            });
            dispatch(userSlice.actions.clearSuccess({}));
            dispatch(userSlice.actions.getAllProducts({}));
        }
    }, [success])

    const handlePress = () => {
        // navigation.navigate('AddItem', { item });
        if (from === 'requests') {
            navigation.navigate('OffersScreen');
        } else if (from === 'listings' || from === 'listingsHome') {
            navigation.navigate('AddItem', { item });
        } else {
            navigation.navigate('ItemDetail', { item });
        }
    };

    const startDate = item?.startDate && new Date(item.startDate).toLocaleDateString('en-GB', {
        day: 'numeric',
    })

    const endDate = item?.endDate && new Date(item.endDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
    })
    

    const handleDelete = () => {
        if (item && item?.id){
            dispatch(userSlice.actions.deleteProduct(item?.id))
            setModalVisible(false);
        }
    };

    return (
        <Pressable style={[styles.card, { marginRight: from == 'listings' ? 0 : wp(2.8), marginBottom: from == 'listings' ? hp(2) : 0 }]} onPress={handlePress}>
            <View style={styles.imageContainer}>
                {Array.isArray(item?.images) && item.images.length > 0 && item.images[0]?.url ? (
                    <Image source={{ uri: item.images[0].url }} style={styles.image} />
                ) : (
                    <Image source={item.image} style={styles.image} />
                )}
                {
                    from == 'listings' &&
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                }
                  {from === 'listings' && (
                    <TouchableOpacity style={styles.deleteIcon} onPress={() => setModalVisible(true)}>
                        <DeleteIcon size={20} />
                    </TouchableOpacity>
                )}

            </View>
            <View style={{ padding: wp(2) }}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{item.title ? item.title : item?.name}</Text>
                    {
                        item?.rating ?
                            <Text style={styles.rating}>{item.rating}</Text> :
                            <View style={{ paddingHorizontal: wp(3), backgroundColor: color.Green2, borderRadius: wp(1) }}>
                                <Text style={{ color: color.White, fontSize: 12 }}>New</Text>
                            </View>
                    }

                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Availability</Text>
                    <Text style={styles.date}>{item?.startDate ? `${startDate} to ${endDate}` : item.date}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Price</Text>
                    <Text style={styles.price}>PKR {item.price}</Text>
                </View>
                <Button
                    loading={false}
                    title='See Details'
                    backgroundColor={color.Default} 
                    textStyle={{ color: color.White, fontSize: 12 }}
                    style={{ paddingVertical: hp(0.6), width: '100%', borderRadius: 2, marginBottom: 0 }}
                    // onPress={() =>  navigation.navigate('OrderDetail', { item })}
                />
            </View>

            <GenericModal visible={modalVisible}>
                <Text style={styles.modalTitle}>Are you sure you want to delete?</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </GenericModal>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp('44'),
        height: 'auto',
        borderRadius: 6,
        backgroundColor: '#F9F9F9',
    },
    imageContainer: {
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        marginBottom: hp(1.5),
    },
    image: {
        width: '100%',
        height: wp('30%'),
        resizeMode: 'cover',
        borderRadius: 10,
    },
    textWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    title: {
        fontSize: 12,
        fontWeight: '400'
    },
    price: {
        fontSize: 10,
        fontWeight: '600'
    },
    rating: {
        fontSize: 10,
        fontWeight: '600',
    },
    date: {
        fontSize: 10,
        fontWeight: '400',
        color: color.Default,
    },
    statusBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: color.Green2,
        paddingHorizontal: wp(2),
        paddingVertical: 2,
        borderRadius: wp(1),
        zIndex: 10,
    },
    statusText: {
        fontSize: 10,
        color: color.White,
        fontWeight: '500',
    },
    deleteIcon: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: color.White,
        padding: 5,
        borderRadius: 20,
        zIndex: 10,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: hp(3),
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        width: '45%',
        paddingVertical: hp(1),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: color.Gray,  // Customize cancel button background color
    },
    deleteButton: {
        backgroundColor: color.Red,  // Customize delete button background color
    },
    buttonText: {
        color: color.White,
        fontSize: 14,
        fontWeight: '500',
    },
});

export default ListingCard;