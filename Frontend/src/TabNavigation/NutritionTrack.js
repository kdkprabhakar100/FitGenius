import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

// Sample data for demonstration
const foodItems = [
  { id: '1', label: 'Apple', kcal: 52 },
  { id: '2', label: 'Chicken Breast', kcal: 165 },
  { id: '3', label: 'Salad', kcal: 100 },
  { id: '4', label: 'Pasta', kcal: 220 },
  { id: '5', label: 'Banana', kcal: 89 },
  { id: '6', label: 'Bread', kcal: 79 },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(foodItems);

  const handleAddFood = (item) => {
    // Implement logic to add the selected food item to nutrition tracking
    console.log('Adding food:', item.label);
    // Example: Dispatch an action or call a function to add to nutrition tracking
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredItems(foodItems);
    } else {
      setFilteredItems(
        foodItems.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search food..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredItems}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemKcal}>{item.kcal} kcal</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddFood(item)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemKcal: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;