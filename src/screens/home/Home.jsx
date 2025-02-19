import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const categories = [
  {
    id: '1',
    title: 'Mental well being',
    subtitle: 'Anxiety/Depression | Stress | Therapy | ADHD',
    bgColor: '#8E44AD',
  },
  {
    id: '2',
    title: 'Startup Ideas',
    subtitle: 'Validate ideas with Founders/Investors | GTM | MVP | PMF',
    bgColor: '#E74C3C',
  },
  {
    id: '3',
    title: 'Entrepreneurs & Fund Raising',
    subtitle: 'Founders connect | VCs/Angel Investors | Founding team',
    bgColor: '#C0392B',
  },
  {
    id: '4',
    title: 'Interview Preparation',
    subtitle: 'Mock Interviews | CV Review | Body Language',
    bgColor: '#7F8C8D',
  },
  {
    id: '5',
    title: 'Working Professionals',
    subtitle: 'Marketing | Senior Management | Tech Experts | E-commerce',
    bgColor: '#2980B9',
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="#ccc" />
        <TextInput
          placeholder="Need help with Tax"
          placeholderTextColor="#ccc"
          style={styles.searchInput}
        />
        <Ionicons name="notifications-outline" size={24} color="#ccc" />
      </View>

      {/* Profile Completion Section */}
      <View style={styles.profileCompletion}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>20%</Text>
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressTextBold}>
            Complete your profile to get discovered and build your brand!
          </Text>
          <TouchableOpacity>
            <Text style={styles.finishText}>Finish setting up →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Find the best person to help you with your query
      </Text>

      {/* Search Bar for Categories */}
      <View style={styles.categorySearchContainer}>
        <TextInput
          placeholder="Search by name, company, skills, and more..."
          placeholderTextColor="#999"
          style={styles.categorySearchInput}
        />
        <Feather name="search" size={20} color="#666" style={styles.categorySearchIcon} />
      </View>

      {/* Categories */}
      <Text style={styles.subTitle}>Connect with</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={[styles.categoryCard, { backgroundColor: item.bgColor }]}>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Experts Section */}
      <Text style={styles.subTitle}>Top experts for you</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  profileCompletion: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressInfo: {
    marginLeft: 10,
    flex: 1,
  },
  progressTextBold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  finishText: {
    color: '#1abc9c',
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  categorySearchContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  categorySearchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  categorySearchIcon: {
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  listContainer: {
    marginTop: 10,
  },
  categoryCard: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;
