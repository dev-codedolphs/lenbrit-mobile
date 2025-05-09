import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'


const MyItemsScreen = () => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
         <Text>My Items</Text>
      </View>
    </SafeAreaView>
  )
}

export default MyItemsScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 10,
    marginHorizontal:20,
  },
})