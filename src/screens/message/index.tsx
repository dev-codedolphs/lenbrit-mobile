import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'


const MessageScreen = () => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
         <Text>Message Screen content</Text>
      </View>
    </SafeAreaView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 10,
    marginHorizontal:20,
  },
})