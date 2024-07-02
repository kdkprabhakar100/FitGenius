import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import axios from 'axios';

const FoodSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dailyCalories, setDailyCalories] = useState(0);

  // Function to search for food
  const searchFood = async () => {
    try {
      const response = await axios.get(`http://192.168.1.70:4000/api/food/search?q=${query}`);
      console.log('Edamam API response:', response.data); // Log the response data
      setSearchResults(response.data.hints.map(hint => hint.food)); // Assuming response.data.hints contains food items
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch daily calories
  const fetchDailyCalories = async () => {
    try {
      const response = await axios.get('http://192.168.1.70:4000/api/food/daily-calories');
      setDailyCalories(response.data.totalCalories);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add food item to daily intake
  const addToDailyIntake = async (item) => {
    try {
      const foodItem = {
        label: item.label,
        brand: item.brand || 'Generic',
        kcal: item.nutrients?.ENERC_KCAL, // Ensure this path is correct based on the logged response
        quantity: 1 // or another appropriate value
      };
      console.log('Sending data to server:', foodItem); // Log the data being sent to the server
      const response = await axios.post('http://192.168.1.70:4000/api/food', foodItem);
      console.log('Server response:', response.data); // Log server response
      fetchDailyCalories(); // Refresh daily calories
    } catch (error) {
      console.error(error);
    }
  };

  // Initial fetch of daily calories on component mount
  useEffect(() => {
    fetchDailyCalories();
  }, []);

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Text>Total Calories Today: {dailyCalories}</Text>
        <Button title="Refresh Calories" onPress={fetchDailyCalories} />
      </View>
      
      <View>
        <TextInput
          placeholder="Search for food..."
          value={query}
          onChangeText={text => setQuery(text)}
          onSubmitEditing={searchFood}
        />
        <Button title="Search" onPress={searchFood} />
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
            <Text>{item.brand || 'Generic'}</Text>
            <Text>Calories: {item.nutrients?.ENERC_KCAL || 'Not available'}</Text>
            <Button title="Add to Daily Intake" onPress={() => addToDailyIntake(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default FoodSearchScreen;
