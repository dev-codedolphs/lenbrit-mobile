import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { ListingItem } from '../../types/types';


interface RequestCardProps {
    item: ListingItem
}

const RequestCard: React.FC<RequestCardProps> = ({ item }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const handlePress = () => {
        navigation.navigate('OffersScreen');
    };

    const startDate = item?.startDate && new Date(item.startDate).toLocaleDateString('en-GB', {
        day: 'numeric',
    })

    const endDate = item?.endDate && new Date(item.endDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
    })

    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <View style={styles.imageContainer}>
                {Array.isArray(item?.images) && item.images.length > 0 && item.images[0]?.url && (
                    <Image source={{ uri: item.images[0].url }} style={styles.image} />
                )}
            </View>
            <View style={{ padding: wp(2) }}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>From</Text>
                    <Text style={styles.title}>{item?.CustomOffer[0]?.borrower?.firstName ?? ''}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Date</Text>
                    <Text style={styles.date}>{`${startDate} to ${endDate}`}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Offer</Text>
                    <Text style={styles.price}>PKR {item?.CustomOffer[0]?.offeredPrice ?? 0}</Text>
                </View>
                {
                    item.status && (
                        <View style={styles.textWrapper}>
                            <TouchableOpacity style={{ backgroundColor: '#01C944', width: '47%', paddingVertical: 4, alignItems: 'center', borderRadius: 4 }}>
                                <Text style={{ color: color.White, fontSize: 10, fontWeight: '500' }}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#E90000', width: '47%', paddingVertical: 4, alignItems: 'center', borderRadius: 4 }}>
                                <Text style={{ color: color.White, fontSize: 10, fontWeight: '500' }}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp('44'),
        height: 'auto',
        borderRadius: 6,
        backgroundColor: '#F9F9F9',
        marginBottom: hp(2)
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
});

export default RequestCard;