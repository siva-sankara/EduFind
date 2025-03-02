import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const RegisterAsTeacher = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>RegisterAsTeacher</Text>
       {/* Profile Completion Section */}
            <View style={styles.profileCompletion}>
                <View style={styles.progressCircle}>
                    <Text style={styles.progressText}>20%</Text>
                </View>
                <View style={styles.progressInfo}>
                    <Text style={styles.progressTextBold}>
                        Complete your profile to get discovered and build your brand!
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileSetUp", {
                        userId: userId,
                        navigation: navigation
                    })}>
                        <Text style={styles.finishText}>Finish setting up →</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:'#111',
        flex:1
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
})

export default RegisterAsTeacher