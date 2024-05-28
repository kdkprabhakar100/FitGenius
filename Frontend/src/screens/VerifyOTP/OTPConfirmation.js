import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Alert,
  Button
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { default_ip_address } from '../../constant/constant';

const OTPConfirmation = () => {
  const [otp, setOtp] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { userid } = route.params;

  const onConfirmPressed = async () => {
    let result = await fetch(`${default_ip_address}/verify-otp`, {
      method: 'post',
      body: JSON.stringify({ userid, otp }),
      headers: { 'Content-Type': 'application/json' },
    });
    result = await result.json();
    if (result.success === false) {
      Alert.alert('OTP Error', result.error);
    } else if (result.success === true) {
      Alert.alert(
        'Registration Successful',
        'Your registration is successful. You can now log in.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ]
      );
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/push.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.root}>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.container}>
          <TextInput
            value={otp}
            onChangeText={(e) => setOtp(e)}
            placeholder="OTP"
            placeholderTextColor="white"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <Button title="Confirm OTP" onPress={onConfirmPressed} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    padding: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  input: {
    color: 'white',
  },
});

export default OTPConfirmation;
