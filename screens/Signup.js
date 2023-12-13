import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      // Check if password and confirm password match
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        setLoading(false);
        return;
      }

      const response = await fetch('https://655500aa63cafc694fe75243.mockapi.io/aman', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        // Registration successful
        Alert.alert('Success', 'Registration successful. Now you can log in.');
        // Navigate to the Login screen
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    // Toggle the secureTextEntry prop for password fields
    // Implement the state and logic for toggling password visibility
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pgoHuvuMGt_8ovZZra-dq4ZuQCHA3XsBRw&usqp=CAU',
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Register</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            returnKeyType="next"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
            returnKeyType="next"
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
            returnKeyType="next"
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
            returnKeyType="next"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
            style={styles.input}
            returnKeyType="done"
            autoCapitalize="none"
          />
          {/* <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.togglePasswordText}></Text>
          </TouchableOpacity> */}
          <Button title="Register" onPress={handleRegister} disabled={loading} />
          {loading && <ActivityIndicator size="small" color="#ffffff" />}
          <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
            Already have an account? Login here
          </Text>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'white',
  },
  togglePasswordText: {
    color: 'white',
    marginBottom: 10,
  },
  loginText: {
    marginTop: 10,
    color: 'white',
  },
});

export default Register;
