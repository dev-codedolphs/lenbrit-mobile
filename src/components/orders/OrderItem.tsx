import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { OrderItemType } from '../../types/types';

interface Props {
    item: OrderItemType;
}

const OrderItem: React.FC<Props> = ({ item }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const handlePress = () => {
        navigation.navigate('OrderDetail', { item });
    };

    function formatDateRange(start: string, end: string): string {
        const startDate = new Date(start);
        const endDate = new Date(end);
      
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
      
        const formattedStart = startDate.toLocaleDateString('en-GB', options);
        const formattedEnd = endDate.toLocaleDateString('en-GB', options);
      
        return `${formattedStart} to ${formattedEnd}`;
      }

    return (
        <Pressable style={styles.orderCard} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item?.listing.images[0]?.url }} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Item</Text>
                    <Text style={styles.value}>{item?.listing?.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Renter</Text>
                    <Text style={styles.value}>{item.listing.userId}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.highlightValue}>{formatDateRange(item.listing.startDate, item.listing.endDate)}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.value}>{item.price}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    orderCard: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        borderRadius: 4,
        marginBottom: hp('2%'),
        padding: wp('2%'),
    },
    imageContainer: {
        marginRight: wp('8%'),
        borderRadius: 4,
    },
    image: {
        width: wp('20%'),
        height: wp('20%'),
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#8E8E8E',
        fontSize: 12,
        fontWeight: '300',
    },
    value: {
        color: '#000',
        fontWeight: '400',
        fontSize: 12,
    },
    highlightValue: {
        color: color.Default,
        fontWeight: '400',
        fontSize: 10,
    },
});
