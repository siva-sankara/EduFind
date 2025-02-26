import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import allText from '../../utility/TextContent';
import { SignUpAPI } from '../../api/apiCalls';

export default function SignupScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  // Submit handler
  const onSubmit = async (data) => {
    console.log('Signup Data:', data);

    if (data.password !== data.confirmPassword) {
      Alert.alert(allText.alertText.signupField, allText.alertText.checkinputs);
      return;
    }

    try {
      const response = await SignUpAPI(data);
      console.log('Signup Response:', response);

      if (response.status === 201) {
        Alert.alert(allText.alertText.success, allText.alertText.accountCreated);
        reset();
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      Alert.alert(allText.alertText.error, allText.alertText.signupFailed);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{allText.screenNames.signup}</Text>

      {/* Name Field */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={allText.inputFields.username}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            style={styles.input}
          />
        )}
        name="name"
        rules={{
          required: allText.requiredFields.nameRequired,
          minLength: {
            value: 3,
            message: allText.errorText.nameTooShort,
          },
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      {/* Email Field */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={allText.inputFields.email}
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
          required: allText.requiredFields.emailrequired,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: allText.errorText.emailerror,
          },
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Password Field */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={allText.inputFields.password}
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
          required: allText.requiredFields.passwordrequired,
          minLength: {
            value: 6,
            message: allText.errorText.passworderror,
          },
        }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Confirm Password Field */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={allText.inputFields.confirmPassword}
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.confirmPassword}
            style={styles.input}
          />
        )}
        name="confirmPassword"
        rules={{
          required: allText.requiredFields.confirmpassrequired,
          validate: value => value === getValues('password') || allText.errorText.passwordNotMatch,
        }}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        // disabled={isLoading}
      >
        <Text style={styles.btnText}>{allText.screenNames.signup}</Text>
      </TouchableOpacity>

      {/* Snackbar for Feedback */}
      <Snackbar
        visible={errors.email || errors.password || errors.confirmPassword}
        onDismiss={() => reset()}
        duration={3000}
      >
        {allText.normaltext.fixerror}
      </Snackbar>

      {/* Navigate to Login Screen */}
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>{allText.normaltext.alreadyHaveAcc}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.linkText, styles.loginText]}> {allText.screenNames.login}</Text>
        </TouchableOpacity>
      </View>
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
  input: {
    marginBottom: 15,
    fontSize: 18
  },
  button: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    backgroundColor: '#F0C244',
    borderRadius: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '400'
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
    fontSize: 16,
    color: '#000',
  },
  loginText: {
    color: '#FF7E5F',  
    fontWeight: 'bold',
  },
});
