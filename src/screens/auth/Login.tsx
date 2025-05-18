import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Google } from '../../assets/icons'
import InputField from '../../components/TextInput'
import Button from '../../components/Button'
import { color } from '../../theme/colors'
import * as space from '../../utils/spacer'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import authSlice from './redux/Slice'
import { AuthNavigationProp } from '../../types/navigation'

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AuthNavigationProp>();
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
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={{ textAlign: 'right' }}>Forget Password?</Text>
        </TouchableOpacity>
        <space.s2 />
        <Button title='SIGN IN' backgroundColor={color.Default} onPress={() => dispatch(authSlice.actions.authenticate())} />
        <space.s3 />
        <Text style={{ fontSize: 14, fontWeight: '700', textAlign: 'center' }}>OR</Text>
        <space.s3 />
        <TouchableOpacity style={styles.button} onPress={() => console.log('pressed')}>
          <Google />
          <Text style={styles.text}>Continue with Google</Text>
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
    paddingTop: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: color.White,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: color.White,
    padding: wp(2.5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.Black,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: color.Black,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: wp(4),
  },
})