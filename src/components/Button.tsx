import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../theme/colors';

interface CustomButtonProps {
  title: string;
  icon?: React.ReactNode;
  loading?: boolean;
  backgroundColor: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

const Button: React.FC<CustomButtonProps> = ({
  title,
  icon,
  loading,
  backgroundColor,
  style,
  textStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={ backgroundColor ? color.White : color.Default} />
      ) : icon ? (
        <View style={styles.contentWithIcon}>
          {icon}
          <Text style={[styles.title, textStyle]}>{title}</Text>
          <View style={{ width: 20 }} /> {/* to center align like space-evenly */}
        </View>
      ) : (
        <Text style={[styles.title, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: hp(1),
    paddingVertical: hp(1.7),
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'DM Sans',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  contentWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Button;
