import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { default_ip_address } from '../constant/constant'; // Adjust the path as needed

const FoodSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dailyCalories, setDailyCalories] = useState(0);

  // Function to search for food
  const searchFood = async () => {
    try {
      const response = await axios.get(`${default_ip_address}/api/food/search?q=${query}`);
      console.log('Edamam API response:', response.data); // Log the response data
      setSearchResults(response.data.hints.map(hint => hint.food)); // Assuming response.data.hints contains food items
    } catch (error) {
      console.error('Error searching for food:', error);
      // Handle error: Display an error message to the user
    }
  };

  // Function to fetch daily calories
  const fetchDailyCalories = async () => {
    try {
      const response = await axios.get(`${default_ip_address}/api/food/daily-calories`);
      setDailyCalories(response.data.totalCalories);
    } catch (error) {
      console.error('Error fetching daily calories:', error);
      // Handle error: Display an error message to the user
    }
  };

  // Function to add food item to daily intake
  const addToDailyIntake = async (item) => {
    try {
      const foodItem = {
        label: item.label,
        brand: item.brand || 'Generic',
        kcal: item.nutrients?.ENERC_KCAL || 0, // Ensure this path is correct based on the logged response
        quantity: 1 // or another appropriate value
      };
      console.log('Sending data to server:', foodItem); // Log the data being sent to the server
      const response = await axios.post(`${default_ip_address}/api/food`, foodItem);
      console.log('Server response:', response.data); // Log server response
      fetchDailyCalories(); // Refresh daily calories
    } catch (error) {
      console.error('Error adding to daily intake:', error);
      // Handle error: Display an error message to the user
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
            <Text style={styles.foodWeight}>Weight: {item.servingSizes?.[0]?.quantity || '100 grams'} {item.servingSizes?.[0]?.label || ''}</Text>
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
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
  foodWeight: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#17a2b8',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FoodSearchScreen;