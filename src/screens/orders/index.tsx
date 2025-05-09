import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'


const OrdersScreen = () => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
         <Text>Orders Screen content</Text>
      </View>
    </SafeAreaView>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 10,
    marginHorizontal:20,
  },
})