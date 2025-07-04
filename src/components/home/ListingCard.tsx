import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { ItemType, OrderItemType } from '../../types/types';


interface ListingCardProps {
    item: ItemType
}

const ListingCard: React.FC<ListingCardProps> = ({ item }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    
    const handlePress = () => {
        navigation.navigate('AddItem', { item });
    };

    const startDate = item?.startDate && new Date(item.startDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
    })

    const endDate = item?.endDate && new Date(item.endDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
    })
    
    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <View style={styles.imageContainer}>
                {Array.isArray(item?.images) && item.images.length > 0 && item.images[0]?.url ? (
                    <Image source={{ uri: item.images[0].url }} style={styles.image} />
                ) : (
                    <Image source={item.image} style={styles.image} />
                )}
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{item.title ? item.title : item?.name}</Text>
                <Text style={styles.rating}>{item.rating}</Text>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>Availability</Text>
                <Text style={styles.date}>{item?.startDate ? `${startDate} to ${endDate}` :  item.date}</Text>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>Price</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            {
                item.status && (
                    <View style={styles.textWrapper}>
                        <TouchableOpacity style={{ backgroundColor: '#01C944', width: '47%', paddingVertical: 4,  alignItems: 'center', borderRadius: 2}}>
                            <Text style={{ color: color.White, fontSize: 10, fontWeight: '500' }}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#E90000', width: '47%', paddingVertical: 4, alignItems: 'center', borderRadius: 2,}}>
                            <Text style={{ color: color.White, fontSize: 10, fontWeight: '500' }}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp('43'),
        height: 'auto',
        borderRadius: 6,
        backgroundColor: '#F9F9F9',
        padding: 8,
        marginRight: wp('4%'),
    },
    imageContainer: {
        paddingVertical: hp(2),
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        marginBottom: hp(1.5),
    },
    image: {
        width: '100%',
        height: wp('30%'),
        resizeMode: 'contain',
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
        fontSize: 10,
        fontWeight: '400'
    },
    price: {
        fontSize: 8,
        fontWeight: '400'
    },
    rating: {
        fontSize: 8,
        fontWeight: '600',
    },
    date: {
        fontSize: 8,
        fontWeight: '400',
        color: color.Default,
    },
});

export default ListingCard;