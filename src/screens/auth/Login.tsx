import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../../components/TextInput'
import Button from '../../components/Button'
import { color } from '../../theme/colors'
import * as space from '../../utils/spacer'
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/icons/logo.png')} />
        <Text style={{ fontSize: 24, fontWeight: '700' }}>Sign In</Text>
        <Text style={{ fontSize: 15, fontWeight: '400', marginTop: hp(0.4) }}>Login to your existing account to start using the app</Text>
        <InputField
          label="EMAIL"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          leftIcon="email-outline"
          keyboardType="email-address"
        />
        <InputField
          label="PASSWORD"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          leftIcon="lock-outline"
          keyboardType="default"
          secureTextEntry={hidePassword}
          rightIcon={hidePassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setHidePassword(!hidePassword)}
        />
        <space.s1 />
        <TouchableOpacity>
          <Text style={{ textAlign: 'right' }}>Forget Password?</Text>
        </TouchableOpacity>
        <space.s2 />
        <Button title='SIGN IN' backgroundColor={color.Default} />
        <space.s3 />
        <Text style={{ fontSize: 14, fontWeight: '700', textAlign: 'center' }}>OR</Text>
        <space.s3 />
        <TouchableOpacity style={styles.button} onPress={() => console.log('pressed')}>
          <Icon name="facebook" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.text}>Continue with Facebook</Text>
        </TouchableOpacity>
        <space.s3 />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={{ fontSize: 16, fontWeight: '700', textAlign: 'center' }}>Dont have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(1.5),
    marginHorizontal: wp(4),
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4267B2',
    padding: wp(3),
    borderRadius: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})