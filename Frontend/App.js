import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/StackNavigation/StackNavigator';
import { FitnessContext } from './src/components/Context/Context';
import { ThemeProvider } from './src/TabNavigation/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <FitnessContext>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </FitnessContext>
    </ThemeProvider>
  );
};


export default App;
