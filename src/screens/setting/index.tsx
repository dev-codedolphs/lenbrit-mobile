import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'


const Settings = () => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
         <Text>Settings</Text>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 10,
    marginHorizontal:20,
  },
})