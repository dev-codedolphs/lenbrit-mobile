import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CustomButtonProps {
  title: string;
  loading?: boolean;
  backgroundColor: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

const Button: React.FC<CustomButtonProps> = ({
  title,
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
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
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
  },
});

export default Button;
