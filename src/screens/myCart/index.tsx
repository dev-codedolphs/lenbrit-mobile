import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

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
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const [cartItems, setCartItems] = useState(
        [1, 2, 3, 4, 5].map((i) => ({ ...sampleCartItem, id: i.toString(), quantity: 1 }))
    );

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const renderItem = ({ item }: { item: typeof sampleCartItem }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CheckoutScreen')} style={styles.card}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.renter}>{item.renter}</Text>
                <Text style={styles.size}>{item.size}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity>
                    <Icon name="trash-can-outline" size={20} color={color.Red} />
                </TouchableOpacity>
                <View style={styles.quantityRow}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                        <Icon name="chevron-down" size={18} color='#8F959E' />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                        <Icon name="chevron-up" size={20} color='#8F959E' />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header title="My Cart" goBack={() => { }} />
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: hp('2%') }}
                    showsVerticalScrollIndicator={false}
                />
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
        padding: 8,
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
