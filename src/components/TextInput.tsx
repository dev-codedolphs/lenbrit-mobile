import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../theme/colors';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  leftIcon: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const InputField: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  keyboardType = 'default',
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {
        label &&
        <Text style={styles.title}>{label}</Text>
      }
      <View style={styles.inputWrapper}>
        <Icon name={leftIcon} size={20} color={color.Default} style={styles.leftIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor="#999"
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Icon name={rightIcon} size={20} style={styles.rightIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
    color: '#888',
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'DM Sans',
    color: '#000',
  },
});

export default InputField;
