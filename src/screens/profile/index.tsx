import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import { EarningIcon, PaymentIcon, PrivacyPolicy, SupportIcon } from '../../assets/icons';
import OptionCard from '../../components/profile/OptionCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import Button from '../../components/Button';


const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  
  return (
      <SafeAreaView style={styles.container}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <View style={styles.infoWrapper}>
            <Text style={styles.name}>Faraz</Text>
            <Text style={styles.username}>@farazii</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="edit" size={14} color={color.White} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
  
        {/* Option Cards */}
        <OptionCard CardIcon={<EarningIcon />} label="Earnings" />
        <OptionCard CardIcon={<PrivacyPolicy />} label="Privacy Policy" />
        <OptionCard CardIcon={<SupportIcon />} label="Help & Support" />
        <OptionCard CardIcon={<PaymentIcon />} label="Payments Method" />
      </SafeAreaView>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: color.Black,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('4%'),
    marginTop: hp(1),
  },
  avatar: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    backgroundColor: '#f1f1f1',
  },
  infoWrapper: {
    flex: 1,
    marginLeft: wp('4%'),
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: color.Black,
  },
  username: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: color.Default,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: color.White,
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 4,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: hp('1.5%'),
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: color.Black,
  },
})