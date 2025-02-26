import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

function HelpScreen() {
  return (
     <ScrollView style={styles.screenContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Help</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Need Assistance?</Text>
        </View>
      </ScrollView>
  )
}
const styles = StyleSheet.create({
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
})
export default HelpScreen;