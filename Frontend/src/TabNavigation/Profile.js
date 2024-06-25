import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from  './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from '../../assets/profile.jpg';

const size = 24;
const color = '#b3b3b3';
const logoutColor = '#d1001f';

const Profile = () => {
  const navigation = useNavigation();
  const { enableDarkTheme, toggleTheme } = useTheme(); // Access theme context
  const [name, setName] = useState('');

  useEffect(() => {
    async function getId() {
      let data = await AsyncStorage.getItem('user');
      data = JSON.parse(data);
      setName(data.name);
    }
    getId();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userInputs');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: enableDarkTheme ? '#181818' : '#fff' }]}>
      <View style={styles.upperView}>
        <View style={styles.imageContainer}>
          <Image source={profile} style={styles.image} />
        </View>
        <Text style={[styles.textName, { color: enableDarkTheme ? '#b3b3b3' : '#000' }]}>{name}</Text>
      </View>
      <View style={styles.lowerView}>
        {/* Edit Profile Button */}
        <Pressable
          onPress={() => console.warn('Pressed')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#22828' : enableDarkTheme ? '#383838' : '#e0e0e0',
              borderRadius: 8,
            },
            styles.button,
          ]}
        >
          <Ionicons name='person-outline' size={size} color={color} />
          <Text style={[styles.buttonText, { color: color }]}>Edit Profile</Text>
        </Pressable>

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#282828' : enableDarkTheme ? '#383838' : '#e0e0e0',
              borderRadius: 8,
            },
            styles.button,
          ]}
        >
          <MaterialIcons name='logout' size={size} color={logoutColor} />
          <Text style={[styles.buttonText, { color: logoutColor }]}>Logout</Text>
        </Pressable>

        {/* Dark Theme Toggle */}
        <View style={styles.darkModeView}>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Ionicons name='moon-outline' size={size} color={color} />
            <Text style={[styles.menuText, { color: color, marginLeft: 10 }]}>Dark Theme</Text>
          </View>
          <Switch
            value={enableDarkTheme}
            onValueChange={toggleTheme}
            thumbColor='#fff'
            trackColor={{ false: '#b3b3b3', true: '#383838' }}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    paddingTop: 20,
  },
  upperView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textName: {
    fontSize: 24,
    color: '#b3b3b3',
    marginTop: 10,
  },
  lowerView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  darkModeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  menuText: {
    fontSize: 18,
    color: '#b3b3b3',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
