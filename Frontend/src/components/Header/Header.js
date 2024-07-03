import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Profile from '../../../assets/profile.jpg';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { default_ip_address } from '../../constant/constant'; // Adjust the path as needed

const Header = ({ name }) => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [quote, setQuote] = useState('');

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('${default_ip_address}/random-quote', {
        method: 'POST', // Using POST method as per your requirement
        headers: {
          'Content-Type': 'text/plain', // Set content type to text/plain
        },
        // Optionally send data in the request body if needed
        // body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data = await response.text(); // Get plain text response
      setQuote(data); // Set the quote text directly
    } catch (error) {
      console.error('Error fetching random quote:', error);
      setQuote('Failed to fetch quote');
    }
  };

  const getDate = () => {
    let date = new Date().toLocaleDateString();
    setCurrentDate(date);
  };

  useEffect(() => {
    fetchRandomQuote();
    getDate();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.imageContainer}>
        <Image source={Profile} style={styles.image} />
      </View>
      <View style={styles.title}>
        <Text style={styles.heading}>Welcome, {name}</Text>
        <Text style={styles.subHeading}>{currentDate}</Text>
        <View style={styles.quoteContainer}>
          <Text style={[styles.quoteText, { color: '#fff' }]}>"{quote}"</Text>
        </View>
      </View>
      {/* Example navigation button */}
      {/* <View>
          <Feather name='bell' size={24} color='#b3b3b3' onPress={() => navigation.navigate('Notifications')} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#b3b3b3',
  },
  subHeading: {
    fontSize: 10,
    opacity: 0.8,
    color: '#b3b3b3',
  },
  quoteContainer: {
    marginTop: 5,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    // color: '#b3b3b3', // Remove this line to ensure the text color is white (#fff)
  },
});

export default Header;
