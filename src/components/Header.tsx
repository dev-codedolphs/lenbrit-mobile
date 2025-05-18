import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../theme/colors';

interface Props {
    title: string,
    goBack: () => void
}
const Header: React.FC <Props> = ({title, goBack}) => {
  return (
      <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
              <Icon name='arrow-back' size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={{ width: 24 }} />
      </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(3)
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: color.Black,
    },
})