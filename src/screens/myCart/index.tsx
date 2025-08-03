import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../redux/Slice';
import { CartItem } from '../../types/types';
import FullScreenLoader from '../../components/basic/FullScreenLoader';
import Toast from 'react-native-toast-message';
import ContentLoader, { Rect } from 'react-content-loader/native';

const sampleCartItem = {
    id: '1',
    quantity: 1,
    title: 'T-Shirt',
    renter: 'Hira',
    size: 'XL',
    date: '10 May to 12 May',
    price: 'PKR 400',
    image: require('../../assets/icons/shirt.png'),
};


const MyCart = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const { cart, success, loading } = useSelector((state:any) => state.user);
    const [cartItems, setCartItems] = useState(cart || []);
    const [refreshing, setRefreshing] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        if (!loading && cart?.length > 0) {
            setIsInitialLoading(false);
        }
    }, [loading, cart?.length]);

    useEffect(() => {
        dispatch(userSlice.actions.getAllCartItems({}));
    }, [])

    useEffect(() => {
        setCartItems(cart || []);
    }, [cart]);

    useEffect(() => {
        if (success) {
            Toast.show({
                type: 'success',
                text1: 'Product removed from cart successfully',
                topOffset: 20,
                visibilityTime: 3000,
                position: 'bottom',
            });

            dispatch(userSlice.actions.clearSuccess({}));
        }
    }, [success]);

    const CartItemSkeleton = () => {
        return (
            <View style={styles.card}>
                <ContentLoader
                    speed={1.2}
                    width={wp('90%')}
                    height={wp('25%')}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    {/* Product Image */}
                    <Rect x="0" y="0" rx="8" ry="8" width={wp('25%')} height={wp('25%')} />

                    {/* Text Blocks */}
                    <Rect x={wp('28%')} y="0" rx="4" ry="4" width="50%" height="10%" />
                    <Rect x={wp('28%')} y={hp('2%')} rx="4" ry="4" width="40%" height="8%" />
                    <Rect x={wp('28%')} y={hp('3.8%')} rx="4" ry="4" width="30%" height="7%" />
                    <Rect x={wp('28%')} y={hp('5.3%')} rx="4" ry="4" width="45%" height="7%" />
                    <Rect x={wp('28%')} y={hp('6.8%')} rx="4" ry="4" width="35%" height="7%" />

                    {/* Trash icon + quantity controls */}
                    <Rect x={wp('80%')} y="0" rx="4" ry="4" width={wp('6%')} height={wp('6%')} />
                    <Rect x={wp('80%')} y={hp('6%')} rx="4" ry="4" width={wp('6%')} height={wp('6%')} />
                </ContentLoader>
            </View>
        );
    };

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prev: any) =>
            prev.map((item: CartItem) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const renderItem = ({ item }: { item: CartItem }) => {
        const startDate = item?.listing?.startDate && new Date(item?.listing?.startDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
        })

        const endDate = item?.listing?.endDate && new Date(item?.listing.endDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
        })

        const date = `${startDate} to ${endDate}`
        const source = item?.listing?.images?.[0]?.url ? { uri: item.listing.images[0].url } : require('../../assets/images/default.jpg')

        return (
        <TouchableOpacity onPress={() => navigation.navigate('CheckoutScreen', { item })} style={styles.card}>
            <Image source={source} style={styles.image} resizeMode="cover" />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item?.listing?.name}</Text>
                <Text style={styles.renter}>{item?.listing?.renter}</Text>
                <Text style={styles.size}>{item?.listing?.size}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.price}>PKR {item?.listing?.price}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => dispatch(userSlice.actions.removeItemFromCart(item?.listingId))}>
                    <Icon name="trash-can-outline" size={20} color={color.Red} />
                </TouchableOpacity>
                <View style={styles.quantityRow}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                        <Icon name="chevron-down" size={18} color='#8F959E' />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                        <Icon name="chevron-up" size={20} color='#8F959E' />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
        )
    };

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(userSlice.actions.getAllCartItems({ isRefresh: true }));
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header title="My Cart" goBack={() => navigation.goBack()} />
                {isInitialLoading && !refreshing ? (
                    <FlatList
                        data={[1, 2, 3, 4]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={() => <CartItemSkeleton />}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item: any) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: hp('2%') }}
                        showsVerticalScrollIndicator={false}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                )}
                {loading && !refreshing && !isInitialLoading && <FullScreenLoader />}
            </View>
        </SafeAreaView>
    );
};

export default MyCart;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: color.White,
    },
    container: {
        flex: 1,
        padding: wp('5%'),
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: wp('3%'),
        marginBottom: hp('2%'),
        alignItems: 'center',
    },
    image: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: 8,
        backgroundColor: '#EFEFEF',
    },
    infoContainer: {
        flex: 1,
        marginLeft: wp('4%'),
    },
    title: {
        fontSize: hp('1.8%'),
        fontWeight: '600',
        color: color.Black,
    },
    renter: {
        fontSize: hp('1.6%'),
        color: '#666',
        marginVertical: hp('0.2%'),
    },
    size: {
        fontSize: hp('1.6%'),
        color: '#666',
        marginBottom: hp('0.2%'),
    },
    date: {
        fontSize: hp('1.5%'),
        color: color.Default,
        fontWeight: '500',
    },
    price: {
        fontSize: hp('1.6%'),
        fontWeight: '500',
        marginTop: hp('0.5%'),
    },
    actions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    quantity: {
        fontSize: hp('1.6%'),
        marginHorizontal: wp('2.5%'),
    },
});
