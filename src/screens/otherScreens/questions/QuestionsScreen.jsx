
   import React, { useCallback, useEffect, useState } from "react";
   import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
   import moment from "moment"; // Import moment.js for date formatting
import { getAllQuestions } from "../../../api/apiCalls";
import { useFocusEffect } from "@react-navigation/native";
   
   const QuestionsScreen = ({navigation, route}) => {
     const {user} = route?.params;
     const [allQuestions , setAllQUestions] = useState([]);
     useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          try {
            const response = await getAllQuestions();
            if (response?.status === 200) {
              setAllQUestions(response?.data);
            }
          } catch (error) {
            console.error("Error fetching career data:", error);
          }
        };
        fetchData();
      }, [])
    );
   
     return (
       <View style={styles.container}>
         <FlatList
           data={allQuestions}
           keyExtractor={(item) => item._id}
           renderItem={({ item }) => {
             // Get the latest 1 or 2 answers
             const latestAnswers = item.answer.slice(-1).reverse();
   
             return (
               <TouchableOpacity onPress={()=> navigation.navigate("Question" , {
                data : item,
                user:user
               })}>

                <View style={styles.card}>
                 {/* Question Details */}
                 <Text style={styles.title}>{item.questionTitle}</Text>
                 <Text style={styles.body}>{item.questionBody}</Text>
                 <Text style={styles.tags}>Tags: {item.questionTags.join(", ")}</Text>
                 <Text style={styles.user}>Asked by: {item.userPosted}</Text>
                 <Text style={styles.date}>
                   Asked {moment(item.askedOn).fromNow()}
                 </Text>
   
                 {/* Answers Section */}
                 {latestAnswers.length > 0 ? (
                   <View style={styles.answersContainer}>
                     <Text style={styles.answersHeader}>Latest Answers:</Text>
                     {latestAnswers.map((ans) => (
                       <View key={ans._id} style={styles.answerBox}>
                         <Text numberOfLines={3} style={styles.answerBody}>{ans.answerBody}</Text>
                         <Text style={styles.answeredBy}>
                           Answered by: {ans.userAnswered} • {moment(ans.answeredOn).fromNow()}
                         </Text>
                       </View>
                     ))}
                   </View>
                 ) : (
                   <Text style={styles.noAnswerText}>No answers yet.</Text>
                 )}
               </View>
               </TouchableOpacity>
             );
           }}
         />
       </View>
     );
   };
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: "#111",
       padding: 10,
     },
     loader: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
     },
     errorContainer: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
     },
     errorText: {
       color: "red",
       fontSize: 16,
     },
     card: {
       backgroundColor: "#222",
       padding: 15,
       marginVertical: 8,
       borderRadius: 8,
     },
     title: {
       fontSize: 18,
       fontWeight: "bold",
       color: "#fff",
     },
     body: {
       fontSize: 14,
       color: "#ccc",
       marginVertical: 5,
     },
     tags: {
       fontSize: 12,
       color: "#bbb",
     },
     user: {
       fontSize: 12,
       color: "#888",
       marginTop: 5,
     },
     date: {
       fontSize: 12,
       color: "#777",
       textAlign: "right",
     },
     answersContainer: {
       marginTop: 10,
       paddingTop: 10,
       borderTopWidth: 1,
       borderTopColor: "#444",
     },
     answersHeader: {
       fontSize: 14,
       fontWeight: "bold",
       color: "#fff",
       marginBottom: 5,
     },
     answerBox: {
       backgroundColor: "#333",
       padding: 10,
       borderRadius: 6,
       marginTop: 5,
     },
     answerBody: {
       fontSize: 14,
       color: "#ddd",
     },
     answeredBy: {
       fontSize: 12,
       color: "#bbb",
       marginTop: 5,
     },
     noAnswerText: {
       fontSize: 12,
       color: "#777",
       marginTop: 5,
     },
   });
   
   export default QuestionsScreen;
   