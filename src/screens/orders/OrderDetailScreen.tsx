import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { OrderItemType } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { color } from '../../theme/colors';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Star } from '../../assets/icons';


type Props = NativeStackScreenProps<MainStackParamList, 'OrderDetail'>;

interface Review {
    id: string;
    name: string;
    date: string;
    rating: number;
    review: string;
    avatar: string;
}

const reviews: Review[] = [
    {
        id: '1',
        name: 'Aspen Siphron',
        date: 'May 12, 2024',
        rating: 4.2,
        review:
            'The bridal dress was absolutely beautiful and exactly as shown in the pictures. It arrived on time and in perfect condition. The lender was very cooperative and professional. I would highly recommend renting from them again!',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: '2',
        name: 'Aspen Siphron',
        date: 'May 12, 2024',
        rating: 3.9,
        review:
            'The bridal dress was absolutely beautiful and exactly as shown in the pictures. It arrived on time and in perfect condition. The lender was very cooperative and professional. I would highly recommend renting from them again!',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: '3',
        name: 'Aspen Siphron',
        date: 'May 12, 2024',
        rating: 4.7,
        review:
            'The bridal dress was absolutely beautiful and exactly as shown in the pictures. It arrived on time and in perfect condition. The lender was very cooperative and professional. I would highly recommend renting from them again!',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    
];

const OrderDetailScreen: React.FC<Props> = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params;

    const renderRow = (label: string, value: any, color: string = '#000') => {
        const isDate = label.toLowerCase() === 'date';

        return (
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text
                    style={[
                        styles.detailValue,
                        { color },
                        isDate && styles.date,
                    ]}
                >
                    {value}
                </Text>
            </View>
        );
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return color.Green;
            case 'in progress':
                return '#FFAE00';
            case 'cancelled':
                return color.Red;
            default:
                return color.Gray;
        }
    };

    const renderItem = ({ item }: { item: Review }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.profile}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.reviewDate}>{item.date}</Text>
                    </View>
                </View>
                <View style={styles.rating}>
                    <Star />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </View>
            <Text style={styles.reviewText}>{item.review}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Header */}
                <Header title='Details' goBack={() => navigation.goBack()} />

                {/* Image and Status */}
                <View style={styles.imageContainer}>
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.sectionTitle}>{item.item}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{ marginRight: wp(2), fontSize: 17, fontWeight: '600'}}>5.0</Text>
                    <Star />
                </View>
                </View>


                {/* Description */}
                <Text style={styles.sectionTitle}>Description</Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {item.description}
                    </Text>
                </View>

                {/* Details */}
                <View style={styles.detailsContainer}>
                    {renderRow('Renter', item.renter)}
                    {renderRow('Date', item.date)}
                    {renderRow('Size', 'Large')}
                    {renderRow('Price', 'PKR 400')}
                </View>
                <Text style={{ fontSize: 18, fontWeight: '400', fontFamily: 'DM Sans', color: '#8E8E8E', textDecorationLine: 'underline' }}>All Reviews</Text>
                {/* FlatList for reviews */}
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text>No reviews available</Text>}
                />

                {/* Actions */}
                <Button title='Message to Renter' backgroundColor={color.Default} />
                {
                    item.status == 'completed' &&
                    <Button title='Cancel' backgroundColor={color.Red} />
                }

            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: wp(4),
    },
    contentContainer: {
        paddingBottom: hp('4%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backArrow: {
        fontSize: hp('2.5%'),
        color: '#000',
    },
    title: {
        fontSize: hp('2.2%'),
        fontWeight: '600',
        color: '#000',
    },
    imageContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        alignItems: 'center',
        paddingVertical: hp('2%'),
        position: 'relative',
    },
    image: {
        width: wp('50%'),
        height: hp('20%'),
    },
    statusBadge: {
        position: 'absolute',
        top: hp('1%'),
        right: wp('4%'),
        backgroundColor: '#FFA726',
        borderRadius: 4,
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('0.3%'),
    },
    statusText: {
        color: '#fff',
        fontSize: hp('1.4%'),
        fontWeight: '500',
    },
    sectionTitle: {
        marginTop: hp('1.5%'),
        fontSize: 16,
        fontWeight: '500',
        color: color.Black,
    },
    descriptionBox: {
        backgroundColor: '#F5F5F5',
        marginTop: hp('1%'),
        borderRadius: 10,
        padding: wp('3%'),
    },
    descriptionText: {
        fontSize: 10,
        fontWeight: '400',
        color: '#8E8E8EEE',
        lineHeight: hp('2.4%'),
    },
    detailsContainer: {
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
        gap: hp('1.3%'),
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 18,
        fontWeight: '400',
        color: '#8E8E8E',
    },
    detailValue: {
        fontSize: 18,
        fontWeight: '500',
        color: color.Black,
    },
    date: { 
        fontSize: 13, 
        fontWeight: '400', 
        color: '#A020F0'   
    },
    primaryButton: {
        backgroundColor: '#A200E6',
        marginHorizontal: wp('5%'),
        marginTop: hp('4%'),
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: hp('2%'),
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
        marginHorizontal: wp('5%'),
        marginTop: hp('1.5%'),
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: hp('2%'),
        fontWeight: '600',
    },
    list: {
        paddingVertical: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
    },
    name: {
        fontWeight: '500',
        fontSize: 12,
    },
    reviewDate: {
        fontWeight: '400',
        fontSize: 10,
        color: '#898B8F',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginLeft: 4,
    },
    reviewText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
});
