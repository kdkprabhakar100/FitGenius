import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import profile from '../../assets/profile.jpg';
import axios from 'axios';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.post('http://192.168.1.70:8081/fetch-user', {
        email: 'manushi.191621@ncit.edu.com', // Replace with authenticated user's email
      });

      if (response.status === 200) {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phonenumber);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      Alert.alert('Error', 'Failed to fetch user data. Please try again later.');
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.post('http://192.168.18.8:4000/update-user', {
        name,
        email,
        phonenumber: phone,
      });

      if (response.status === 200) {
        Alert.alert('Profile Updated', 'Changes saved successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      Alert.alert('Update Failed', 'Failed to update profile. Please try again later.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post('http://192.168.18.8:4000/delete-user', {
        email: 'manushipaudel00@gmail.com', // Replace with authenticated user's email
      });

      if (response.status === 200) {
        Alert.alert('Account Deleted', 'Your account has been deleted.');
        // Optionally, you can navigate the user to a different screen after deletion
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error.message);
      Alert.alert('Delete Failed', 'Failed to delete account. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <View style={styles.profileContainer}>
        <Image source={profile} style={styles.profileImage} />
        <Text style={styles.label}>Change Profile Picture</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false} // Make email non-editable
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Changes"
          onPress={handleSaveProfile}
          color="#007bff"
          style={styles.saveButton}
        />
        {/* <Button
          title="Delete Account"
          onPress={handleDeleteAccount}
          color="#dc3545"
          style={styles.deleteButton}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'floralwhite',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'lightgray',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  saveButton: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  deleteButton: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default EditProfile;
