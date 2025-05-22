import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { color } from '../../theme/colors';
import Button from '../../components/Button';
import Header from '../../components/Header';


type Props = NativeStackScreenProps<MainStackParamList, 'ItemDetail'>;

const ItemDetailScreen: React.FC<Props> = ({ route }) => {
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Header */}
                <Header title='Item Details' goBack={() => navigation.goBack()} />

                {/* Image and Status */}
                <View style={styles.imageContainer}>
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>Edit Item</Text>
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
                    {renderRow('Item', item.title)}
                    {renderRow('Renter', item.renter)}
                    {renderRow('Date', item.date)}
                    {renderRow('Size', 'Large')}
                    {renderRow('Price', 'PKR 400')}
                </View>

                {/* Actions */}
                <Button title='Delete Item' backgroundColor={color.Red} />

            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemDetailScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: hp('2%'),
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
        backgroundColor: color.Default,
        borderRadius: 4,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.5%'),
    },
    statusText: {
        color: '#fff',
        fontSize: 10,
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
        marginTop: hp('3%'),
        marginBottom: hp('5%'),
        gap: hp('1.5%'),
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
});
