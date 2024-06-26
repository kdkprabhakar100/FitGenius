import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import profile from '../../assets/profile.jpg';

const EditProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('123-456-7890');

  const handleSaveProfile = () => {
    // Placeholder for save logic
    Alert.alert('Profile Updated', 'Changes saved successfully!');
  };

  const handleDeleteAccount = () => {
    // Placeholder for delete logic
    Alert.alert('Account Deleted', 'Your account has been deleted.');
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
          onChangeText={setEmail}
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
        <Button
          title="Delete Account"
          onPress={handleDeleteAccount}
          color="#dc3545"
          style={styles.deleteButton}
        />
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
