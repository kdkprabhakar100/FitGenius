import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import stepsIcon from '../../assets/steps.png';

const StepCountingPage = () => {
  return (
    <View style={styles.container}>
      <Image source={stepsIcon} style={styles.stepsIcon} />
      <Text style={styles.title}>Step Counter</Text>
      <Text style={styles.stepCount}>You have walked 10,000 steps today!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  stepsIcon: {
    width: 500,
    height: 400,
    marginBottom: 50,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b3b3b3',
    marginBottom: 50,
  },
  stepCount: {
    fontSize: 20,
    color: '#777',
    marginBottom: 150,
  },
});

export default StepCountingPage;
