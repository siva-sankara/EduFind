

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import HomeScreen from './home/Home';
import allText from '../utility/TextContent';
import SearchScreen from './search/Search';
import HelpScreen from './help/Help';
import ProfileScreen from './profile/Profile';
import { useNavigation } from '@react-navigation/native';

const BottomTabScreen = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('home');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen  navigation={navigation} />;
      case 'search':
        return <SearchScreen navigation={navigation}/>;
      case 'profile':
        return <ProfileScreen navigation={navigation}/>;
      case 'help':
        return <HelpScreen navigation={navigation}/>;
      default:
        return <HomeScreen navigation={navigation}/>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {renderScreen()}
        {!isKeyboardVisible && (
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'home' && styles.activeTab]}
            onPress={() => setActiveTab('home')}>
            <Icon name="home" size={24} color={activeTab === 'home' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>{allText.screenNames.home}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => setActiveTab('search')}>
            <Icon name="search" size={24} color={activeTab === 'search' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>{allText.screenNames.search}</Text>
          </TouchableOpacity>

          
          {/* <TouchableOpacity
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => setActiveTab('profile')}>
            <AntDesign name="pluscircleo" size={24} color={activeTab === 'profile' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Sources</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[styles.tab, activeTab === 'help' && styles.activeTab]}
            onPress={() => setActiveTab('help')}>
            <Icon name="help" size={24} color={activeTab === 'help' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>{allText.screenNames.help}</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => setActiveTab('profile')}>
            <Icon name="person" size={24} color={activeTab === 'profile' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>{allText.screenNames.profile}</Text>
          </TouchableOpacity>
        </View> )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor:"black",
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#f0f4ff',
    // borderRadius:70
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeTabText: {
    color: '#4c669f',
    fontWeight: '600',
  },
});

export default BottomTabScreen;
