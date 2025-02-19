import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import allText from '../../utility/TextContent';



export default function LoginScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  // Submit handler
  const onSubmit = data => {
    if (data.email === "test@example.com" && data.password === "password123") {
      Alert.alert("Login Success", "Welcome back!");
    } else {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
   <View style={{alignItems:"center" , marginBottom:20}}>
    <Text style={styles.helloText}>{allText.normaltext.helloText}</Text>
   <Text style={styles.welcomeText}>{allText.normaltext.welcome}</Text>
   </View>
      <Text style={styles.header}>{allText.screenNames.login}</Text>
      {/* Email Field */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
            style={styles.input}
          />
        )}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email format',
          },
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Password Field */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
            style={styles.input}
          />
        )}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        <Text style={styles.btnText}>{allText.screenNames.login}</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>{allText.normaltext.dontHavAcc}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.linkText, styles.loginText]}>{" "}{allText.screenNames.signup}</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={errors.email || errors.password}
        onDismiss={() => reset()}
        duration={3000}
      >
        <Text >{allText.normaltext.fixerror}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  helloText:{
    fontSize:30,
     color:"black", 
     fontWeight:900,
     marginBottom:20
  },

  welcomeText:{
    fontSize:20,
    color:"gray",
    alignItems:"center",
  },
  input: {
    marginBottom: 15,
    fontSize: 18, color:"F0C244"
  },
  button: {
    marginTop: 20,
    padding:10,
    alignItems:"center",
    backgroundColor: '#F0C244',
    borderRadius:20,
    cursor:"pointer"
  },

  btnText:{
    fontSize:18,
    fontWeight:400
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#000',
  },
  loginText: {
    color: '#FF7E5F',  // Coral color for the Login link
    fontWeight: 'bold',
    fontSize:16
  },
});
