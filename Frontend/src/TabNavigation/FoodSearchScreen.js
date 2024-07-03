import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const FoodSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dailyCalories, setDailyCalories] = useState(0);

  // Function to search for food
  const searchFood = async () => {
    try {
      const response = await axios.get(`http:/192.168.18.22:4000/api/food/search?q=${query}`);
      console.log('Edamam API response:', response.data); // Log the response data
      setSearchResults(response.data.hints.map(hint => hint.food)); // Assuming response.data.hints contains food items
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch daily calories
  const fetchDailyCalories = async () => {
    try {
      const response = await axios.get('http:/192.168.18.22:4000/api/food/daily-calories');
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
      const response = await axios.post('http:/192.168.18.22:4000/api/food', foodItem);
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
    <View style={styles.container}>
      <View style={styles.caloriesContainer}>
        <Text style={styles.totalCaloriesText}>Total Calories Today: {dailyCalories}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchDailyCalories}>
          <Text style={styles.refreshButtonText}>Refresh Calories</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          value={query}
          onChangeText={text => setQuery(text)}
          onSubmitEditing={searchFood}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchFood}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodLabel}>{item.label}</Text>
            <Text style={styles.foodBrand}>{item.brand || 'Generic'}</Text>
            <Text style={styles.foodCalories}>Calories: {item.nutrients?.ENERC_KCAL || 'Not available'}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToDailyIntake(item)}>
              <Text style={styles.addButtonText}>Add to Daily Intake</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'floralwhite',
  },
  caloriesContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  totalCaloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#008b8b',
    padding: 10,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
  marginBottom: 70,
  elevation: 12,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 1,
  shadowOpacity: 2,
  shadowRadius: 4,
  paddingHorizontal: 10,
  paddingVertical: 15,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  foodItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2, 
  },
  foodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodBrand: {
    fontSize: 14,
    color: '#555',
  },
  foodCalories: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#17a2b8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FoodSearchScreen;
