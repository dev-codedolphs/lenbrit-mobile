import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../../navigation/MainStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ListingItem } from '../../types/types';
import ListingCard from './ListingCard';
import Header from '../../components/Header';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Listings'>;

const ListingsScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { products } = useSelector((state: any) => state.user);
    const approvedItems = products?.results?.filter((item: ListingItem) => item.status === 'APPROVED');
    const { width } = useWindowDimensions();
    const numColumns = width >= 600 ? 2 : 1;


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 16 }}>
                <Header title='Item Details' goBack={() => navigation.goBack()} />
            </View>

            <FlatList
                key={`cols-${numColumns}`}
                data={approvedItems}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ListingCard item={item} />}
            />
        </SafeAreaView>
    );
};

export default ListingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 24, gap: 12 },
    row: { columnGap: 12 },
});
