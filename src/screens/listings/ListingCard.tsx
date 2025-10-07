// ListingCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { Star } from '../../assets/icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

export default function ListingCard({ item }: { item: any }) {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const start = moment(item.startDate).format('D MMM');
    const end = moment(item.endDate).format('D MMM');

    return (
        <View style={styles.card}>
            <View style={styles.imageWrap}>
                <Image source={{ uri: item.images?.[0]?.url }} style={styles.image} />
            </View>

            <View style={{ padding: wp(2) }}>
                <View style={styles.availabilityRow}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingText}>5.0</Text>
                        <Star />
                    </View>
                </View>

                <View style={styles.availabilityRow}>
                    <Text style={styles.label}>Availability</Text>
                    <Text style={styles.availabilityValue}>{`${start} to ${end}`}</Text>
                </View>

                <View style={styles.availabilityRow}>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.price}>PKR {item.price}</Text>
                </View>

                <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('ItemDetail', { item })}>
                    <Text style={styles.ctaText}>See Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageWrap: {
        position: 'relative'
    },
    image: {
        width: '100%',
        height: hp(16),
        borderRadius: 4
    },
    title: {
        marginTop: 4,
        fontSize: 12
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        columnGap: 6
    },
    ratingText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '700'
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2
    },
    label: {
        color: '#444',
        fontSize: 12
    },
    availabilityValue: {
        color: '#9C27B0',
        fontSize: 10
    },
    price: {
        color: '#000',
        marginTop: 2,
        fontSize: 12
    },
    cta: {
        marginTop: 10,
        backgroundColor: '#9C27B0',
        paddingVertical: 4,
        borderRadius: 4
    },
    ctaText: {
        color: '#fff',
        textAlign: 'center',
    },
});
