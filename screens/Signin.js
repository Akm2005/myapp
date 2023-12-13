// Counter.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from './authSlice';

const Counter = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);

  const handleCounter = async () => {
    try {
      const response = await fetch('https://655500aa63cafc694fe75243.mockapi.io/aman', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        Alert.alert('Error', 'Unable to fetch user data. Please try again.');
        return;
      }

      const userData = await response.json();

      // Check if the provided email and password match any user in the fetched data
      const matchingUser = userData.find(
        (user) => user.email === email && user.password === password
      );

      if (matchingUser) {
        Alert.alert('Success', 'Login successful.');
        // Navigate to the Home screen or any other authenticated screen
        navigation.navigate('Home', { username: matchingUser.username });
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pgoHuvuMGt_8ovZZra-dq4ZuQCHA3XsBRw&usqp=CAU' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => dispatch(setEmail(text))}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => dispatch(setPassword(text))}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleCounter} />
        <Text style={styles.registerText} onPress={navigateToRegister}>
          Don't have an account? Register here
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  // Add a margin to create space between the button and the text
  registerText: {
    marginTop: 10,
    color: 'white',
  },
});

export default Counter;
