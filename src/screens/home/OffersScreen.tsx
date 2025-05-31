import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../../components/Header';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

const sampleOffers = Array(8).fill({
    item: 'T Shirt',
    renter: 'Hira',
    date: '10 May to 12 May',
    price: 'PKR 400',
    size: 'large',
    description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
    image: require('../../assets/icons/shirt.png'),
    status: 'completed',
  });

export default function OffersScreen() {
      const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    
    const renderItem = ({ item }: { item: typeof sampleOffers[0] }) => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.details}>
                <View style={styles.row}>
                    <Text style={styles.label}>From</Text>
                    <Text style={styles.valueRight}>{item.renter}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Offer</Text>
                    <Text style={styles.valueRight}>{item.price}</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable style={styles.acceptButton}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </Pressable>
                    <Pressable style={styles.rejectButton}>
                        <Text style={styles.buttonText}>Reject</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header title='Offers' goBack={() => navigation.goBack()} />
                <FlatList
                    data={sampleOffers}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: color.White,
    },
    container: {
        flex: 1,
        padding: wp('4%'),
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        borderRadius: 4,
        marginBottom: hp('2%'),
        padding: wp('3%'),
    },
    imageContainer: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        backgroundColor: '#F3F3F3',
        marginRight: wp('8%'),
        borderRadius: 4,
    },
    image: {
        width: wp('18%'),
        height: wp('18%'),
    },
    details: {
        flex: 1,
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        color: color.Black,
        fontSize: 12,
        fontWeight: '300',
    },
    valueRight: {
        fontSize: 14,
        fontWeight: '500',
        color: '#444',
    },
    date: {
        color: color.Default,
        fontWeight: '500',
        fontSize: 12,
        marginBottom: 6,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
        gap: 8,
    },
    acceptButton: {
        backgroundColor: color.Green,
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    rejectButton: {
        backgroundColor: color.Red,
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});
