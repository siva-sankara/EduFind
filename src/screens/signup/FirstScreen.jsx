import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import allText from '../../utility/TextContent'

export default function FirstScreen({navigation}) {
    return (
        <View>
            <View style={styles.logoCon}>

            </View>
            <View style={{marginTop:25}}>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={styles.buttonCon}>
                    <Text style={styles.textField}> {allText.screenNames.login}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCon} onPress={()=> navigation.navigate("SignUp")}>
                    <Text  style={styles.textField}>{allText.screenNames.signup}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    logoCon: {
        height: 650,
        backgroundColor: '#00aeff',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30

    },
    buttonCon:{
        padding:20,
        backgroundColor:'#F0C244',
        display:"flex",
        alignItems:"center",
        marginVertical:5,
        borderRadius:20,
         marginHorizontal:30
    },
    textField:{
        fontSize:18,
         fontWeight:600
    }
})