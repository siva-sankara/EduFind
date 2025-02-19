
// // import { useState } from "react";
// // import { StyleSheet, Text, View } from "react-native";
// // import { BottomNavigation } from "react-native-paper";
// // import Home from "./home/Home";
// // const ProjectsScreen = () => <View style={styles.screen}><Text>Projects</Text></View>;
// // const CreateScreen = () => <View style={styles.screen}><Text>Create</Text></View>;
// // const TemplatesScreen = () => <View style={styles.screen}><Text>Templates</Text></View>;
// // const ProScreen = () => <View style={styles.screen}><Text>Pro</Text></View>;

// // // Main App Component with Bottom Navigation
// // const BottomTabScreen = () => {
// //   const [index, setIndex] = useState(0);
// //   const [routes] = useState([
// //     { key: 'home', title: 'Home', icon: 'home' },
// //     { key: 'projects', title: 'Projects', icon: 'folder' },
// //     { key: 'create', title: 'Create', icon: 'plus-circle' },
// //     { key: 'templates', title: 'Templates', icon: 'shape' },
// //     { key: 'pro', title: 'Pro', icon: 'crown' },
// //   ]);

// //   const renderScene = BottomNavigation.SceneMap({
// //     home: Home,
// //     projects: ProjectsScreen,
// //     create: CreateScreen,
// //     templates: TemplatesScreen,
// //     pro: ProScreen,
// //   });

// //   return (
// //     <BottomNavigation
// //       navigationState={{ index, routes }}
// //       onIndexChange={setIndex}
// //       renderScene={renderScene}
// //       shifting={false}
// //       screenOptions={({ route }) => ({
// //         tabBarIcon: ({ color, size }) => {
// //           let iconName;

// //           if (route.name === 'Home') iconName = 'home';
// //           else if (route.name === 'Projects') iconName = 'folder';
// //           else if (route.name === 'Create') iconName = 'plus-circle';
// //           else if (route.name === 'Templates') iconName = 'shape';
// //           else if (route.name === 'Pro') iconName = 'crown';

// //           return <Icon name={iconName} size={size} color={color} />;
// //         },
// //         tabBarActiveTintColor: '#4A90E2', // Active tab color
// //         tabBarInactiveTintColor: '#808080', // Inactive tab color
// //         tabBarStyle: styles.bottomTab, // Custom tab styles
// //         tabBarLabelStyle: styles.tabLabel, // Custom text styles
// //       })}
// //     />
// //   );
// // };


// // const styles = StyleSheet.create({
// //     screen: { flex: 1, justifyContent: 'center', alignItems: 'center' }
// //   });

  
// //   export default BottomTabScreen;


// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { BottomNavigation } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // Placeholder Screens
// const HomeScreen = () => <View style={styles.screen}><Text>🏠 Home Screen</Text></View>;
// const ProjectsScreen = () => <View style={styles.screen}><Text>📂 Projects</Text></View>;
// const CreateScreen = () => <View style={styles.screen}><Text>➕ Create</Text></View>;
// const TemplatesScreen = () => <View style={styles.screen}><Text>📐 Templates</Text></View>;
// const ProScreen = () => <View style={styles.screen}><Text>👑 Pro</Text></View>;

// const BottomTabScreen = () => {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'home', title: 'Home', icon: 'home' },
//     { key: 'projects', title: 'Projects', icon: 'folder' },
//     { key: 'create', title: 'plus-circle' },
//     { key: 'templates', title: 'shape' },
//     { key: 'pro', title: 'crown' },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     home: HomeScreen,
//     projects: ProjectsScreen,
//     create: CreateScreen,
//     templates: TemplatesScreen,
//     pro: ProScreen,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//       shifting={false} 
//       activeColor="#4A90E2" 
//       inactiveColor="#808080" 
//       barStyle={styles.bottomTab} 
//     />
//   );
// };

// const styles = StyleSheet.create({
//   screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
//   bottomTab: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 10, // Shadow effect
//     height: 70, // Increase tab height
//     paddingBottom: 10, // Adjust spacing
//   },
// });

// export default BottomTabScreen;





import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use vector icons instead of Expo
import HomeScreen from './home/Home';


const SearchScreen = () => (
  <ScrollView style={styles.screenContainer}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Search</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.welcomeText}>Discover</Text>
    </View>
  </ScrollView>
);

const ProfileScreen = () => (
  <ScrollView style={styles.screenContainer}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Profile</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.welcomeText}>Your Profile</Text>
    </View>
  </ScrollView>
);

const HelpScreen = () => (
  <ScrollView style={styles.screenContainer}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Help</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.welcomeText}>Need Assistance?</Text>
    </View>
  </ScrollView>
);

const BottomTabScreen = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'help':
        return <HelpScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {renderScreen()}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'home' && styles.activeTab]}
            onPress={() => setActiveTab('home')}>
            <Icon name="home" size={24} color={activeTab === 'home' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => setActiveTab('search')}>
            <Icon name="search" size={24} color={activeTab === 'search' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => setActiveTab('profile')}>
            <Icon name="person" size={24} color={activeTab === 'profile' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'help' && styles.activeTab]}
            onPress={() => setActiveTab('help')}>
            <Icon name="help" size={24} color={activeTab === 'help' ? '#4c669f' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>Help</Text>
          </TouchableOpacity>
        </View>
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
  screenContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#f0f4ff',
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
