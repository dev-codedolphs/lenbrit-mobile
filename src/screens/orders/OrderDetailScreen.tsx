import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { color } from '../../theme/colors';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Star } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../redux/Slice';
import Toast from 'react-native-toast-message';


type Props = NativeStackScreenProps<MainStackParamList, 'OrderDetail'>;

const OrderDetailScreen: React.FC<Props> = ({ route }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state:any) => state.auth);
    const { loading, success } = useSelector((state:any) => state.user);
    const navigation = useNavigation();
    const { item }: any = route.params;
    const startDate = item?.listing?.startDate &&
        new Date(item.listing.startDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
        });

    const endDate = item?.listing?.endDate &&
        new Date(item.listing.endDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
        });

    const date =`${startDate} to ${endDate}`

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
        switch (status) {
            case 'COMPLETED':
                return color.Green;
            case 'IN_PROGRESS':
                return '#FFAE00';
            case 'CANCELLED':
                return color.Red;
            default:
                return color.Gray;
        }
    };

    useEffect(() => {
        if (success) {
            (navigation as any).navigate('Tabs', { screen: 'Orders' });
            Toast.show({
                type: 'success',
                text1: 'Product added to cart successfully',
                topOffset: 20,
                visibilityTime: 3000,
                position: 'bottom',
            });
            dispatch(userSlice.actions.clearSuccess({})); 
            dispatch(userSlice.actions.getAllOrders({}));
        }
    }, [success])

    const handleAddToCart = () => {
        if (item?.id) {
            dispatch(userSlice.actions.addToCart({ listingId: item.id }));
        }
    };

    const handleChatToLender = () => {
        (navigation as any).navigate('Tabs', { screen: 'Message' });
    }

    const handleCancelClick = (orderId: number | string): void => {
        if (!orderId) {
            console.warn("Cancel order failed: orderId is missing");
            return;
        }

        dispatch(
            userSlice.actions.cancelOrder({
                orderId,
            })
        );
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Header */}
                <Header title='Details' goBack={() => navigation.goBack()} />

                {/* Image and Status */}
                <View style={styles.imageContainer}>
                    <Image
                        source={
                            item?.listing?.images?.length > 0 && item.listing.images[0]?.url
                                ? { uri: item.listing.images[0].url }
                                : require('../../assets/images/default.jpg')
                        }
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                        <Text style={styles.statusText}>
                            {item?.status}
                        </Text>
                    </View>
                </View>
                {item?.listing?.images?.length > 1 && (
                    <View style={styles.otherImagesRow}>
                        {item.listing.images.slice(1).map((img: any, index: number) => (
                            <Image
                                key={index}
                                source={{ uri: img.url }}
                                style={[
                                    styles.otherImage,
                                    { flex: 1 / (item.listing.images.length - 1) }, // distribute evenly
                                ]}
                                resizeMode="cover"
                            />
                        ))}
                    </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.sectionTitle}>{item?.listing?.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{ marginRight: wp(2), fontSize: 17, fontWeight: '600'}}>5.0</Text>
                    <Star />
                </View>
                </View>


                {/* Description */}
                <Text style={styles.sectionTitle}>Description</Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {item.listing.description}
                    </Text>
                </View>

                {/* Details */}
                <View style={styles.detailsContainer}>
                    {renderRow(
                        'Renter',
                        item.listing.user?.firstName
                            ? item.listing.user.firstName
                            : item.listing.user?.email?.split('@')[0] ?? 'N/A'
                    )}                 
                    {renderRow('Date', date)}
                    {renderRow('Size', item.listing.size)}
                    {renderRow('Price', `PKR ${item.listing.price}`)}
                </View>

                <Button title={ user.role == 'BORROWER' ? 'Message to Lender' : 'Message to Renter'} backgroundColor={color.Default} />


                {/* Actions */}
                <View style={styles.buttonContainer}>
                {/* <Button title='Chat with Lender' textStyle={{ fontSize: 14 }} backgroundColor={color.Default} style={{ width: '48%', paddingVertical: hp(1.2)}} onPress={handleChatToLender} />
                <Button title='Add to Cart' textStyle={{ fontSize: 14 }} backgroundColor='#00826F' style={{ width: '48%', paddingVertical: hp(1.2)}} onPress={handleAddToCart} loading={loading} />
                <Button title='Rent Now' textStyle={{ fontSize: 14 }} backgroundColor={color.Black} style={{ width: '48%', paddingVertical: hp(1.2)}} />
                <Button title='Make offer' textStyle={{ fontSize: 14 }} backgroundColor='#FFAE00' style={{ width: '48%', paddingVertical: hp(1.2)}} /> */}
                </View>
                {
                    item.status == 'IN_PROGRESS' &&
                    <Button title='Cancel' backgroundColor={color.Red} loading={loading} onPress={() => handleCancelClick(item?.orderId)} />
                }

            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;


const styles = StyleSheet.create({
    container: {
        flex:1,
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
        height: hp(22),
        width:'100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
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
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    otherImagesRow: {
        flexDirection: 'row',
        marginTop: hp(1),
        gap: wp(2),
    },

    otherImage: {
        height: hp(10),
        borderRadius: 8,
    },
});
