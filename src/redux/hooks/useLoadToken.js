// src/redux/hooks/useLoadToken.js
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

const useLoadToken = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(setCredentials({ token, user: null }));
      }
      setLoading(false);
    };
    loadToken();
  }, [dispatch]);

  return loading;
};

export default useLoadToken;
