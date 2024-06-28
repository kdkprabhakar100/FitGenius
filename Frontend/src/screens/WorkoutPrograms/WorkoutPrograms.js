import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Home from './WorkoutHome';
import { useTheme } from '../../TabNavigation/ThemeContext';

const WorkoutPrograms = ({ route }) => {
  const { enableDarkTheme } = useTheme();
  const result = route.params?.result;

  // Define dynamic styles based on the theme
  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: enableDarkTheme ? '#181818' : '#FFFFFF', // Use dark or light background color
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: enableDarkTheme ? '#FFFFFF' : '#000000', // Text color based on the theme
      fontSize: 32,
      textAlign: 'center',
    },
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={dynamicStyles.container}>
        {result && (
          <View>
            <Text style={dynamicStyles.text}>Intensity: {result.Intensity}</Text>
          </View>
        )}
        <Home />
      </View>
    </ScrollView>
  );
};

export default WorkoutPrograms;
