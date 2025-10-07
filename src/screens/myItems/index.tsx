import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../theme/colors'
import Button from '../../components/Button'
import ListingCard from '../../components/home/ListingCard';
import * as space from '../../utils/spacer'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { ItemType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../redux/Slice';

const MyItemsScreen = () => {
  const { products } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(userSlice.actions.getAllProducts({}));
    }, [dispatch])
  );

  useEffect(() => {
    if (refreshing) setRefreshing(false);
  }, [products, refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(userSlice.actions.getAllProducts({}));
  }, [dispatch]);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.wrapper}>
         <Button title='Add New Items' backgroundColor={color.Default} onPress={() => navigation.navigate('AddItem')} />
         <space.s2 />
        <FlatList
          data={products?.results}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={onRefresh}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          renderItem={({ item }: {item: ItemType}) => <ListingCard item={item} from='listings' />}
        />
      </View>
    </SafeAreaView>
  )
}

export default MyItemsScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: color.White
  },
})