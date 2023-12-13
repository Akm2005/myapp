import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = ({ route }) => {
  // Extract the username from the route parameters
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text>Welcome, {username}!</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  profileBar: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default Home;
