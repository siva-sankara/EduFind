import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../api/apiCalls';
import { getUserRoleFromToken } from '../../utility/utiles';
import UserHome from './UserHome';
import TeacherHome from './TeacherHome';


const HomeScreen = ({ navigation  , user}) => {
  const userId = useSelector((state) => state?.auth?.userId)
  const token = useSelector((state) => state?.auth?.token);
  const userRole = getUserRoleFromToken(token);
  
  return (
        <View  style={styles.container}>
          {userRole === "user" && (
            <TeacherHome navigation={navigation} userId={userId} userRole={userRole}/>
          )}

          {userRole === "teacher" && (
             <UserHome  navigation={navigation} userId={userId} userRole={userRole}/>
          )}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
  
});

export default HomeScreen;
