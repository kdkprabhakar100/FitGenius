import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import Header from '../components/Header/Header';
import Banner from '../components/Banners/Banner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext'; // Adjust the path as necessary

const ScreenHeight = Dimensions.get("window").height;

const titles = {
  exercise: 'Explore Workout Programs',
  diet: 'Discover Healthy Eating Plans',
  progress: 'Track Your Fitness Progress',
};

const Home = () => {
  const { enableDarkTheme } = useTheme(); // Access the theme state
  const [name, setName] = useState('');

  useEffect(() => {
    const getData = async () => {
      let data = await AsyncStorage.getItem('user');
      let parseData = JSON.parse(data);
      if (parseData) {
        setName(parseData.name);
      }
    };
    getData();
  }, []);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: enableDarkTheme ? '#181818' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: ScreenHeight,
    },
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={dynamicStyles.container}>
        <Header name={name} />
        <View style={styles.banner}>
          <Banner
            backgroundColor={enableDarkTheme ? '#333' : '#f0f0f0'}
            imageBackground={require('../../assets/gradient1.jpg')}
            bannerImage={require('../../assets/exerciseGirl.png')}
            title={titles.exercise}
            type='EXERCISE'
            screenName='WorkoutPrograms'
          />
          <Banner
            backgroundColor={enableDarkTheme ? '#444' : '#f0f0f0'}
            imageBackground={require('../../assets/gradient2.jpg')}
            bannerImage={require('../../assets/diet.png')}
            title={titles.diet}
            type='DIET'
            screenName='Diet'
          />
          <Banner
            backgroundColor={enableDarkTheme ? '#555' : '#f0f0f0'}
            imageBackground={require('../../assets/gradient3.jpg')}
            bannerImage={require('../../assets/progress.png')}
            title={titles.progress}
            type='PROGRESS'
            screenName='ProgressTracking'
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: 16,
    flex: 1,
    width: '100%',
  },
});

export default Home;
