import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';

interface Item {
    id: string;
    title: string;
    price: string;
    status?: string;
    date: string;
    rating: string;
    image: any;
}

interface ListingCardProps {
    item: Item
}

const ListingCard: React.FC<ListingCardProps> = ({ item }) => {
    return (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.rating}>{item.rating}</Text>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>Availability</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>Price</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            {
                item.status && (
                    <View style={styles.textWrapper}>
                        <TouchableOpacity style={{ backgroundColor: color.Green, width: '47%', paddingVertical: 4,  alignItems: 'center', borderRadius: 2}}>
                            <Text style={{ color: color.White, fontSize: 10, fontWeight: '500' }}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: color.Red, width: '47%', paddingVertical: 4, alignItems: 'center', borderRadius: 2,}}>
                            <Text style={{ color: color.White, fontSize: 10, fontWeight: '500' }}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp('42'),
        borderRadius: 6,
        backgroundColor: '#F3F3F3',
        elevation: 2,
        paddingHorizontal: 8,
        paddingTop: 10,
        marginRight: wp('4%'),
    },
    image: {
        width: '100%',
        height: wp('30%'),
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: hp(1.5),
    },
    textWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
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