import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { uploadAUserQuery, getAllQuestions, getUserDetails } from "../../../api/apiCalls";

const UserQueries = ({ navigation }) => {
  const userId = useSelector((state) => state.auth.userId);
  const [ user , setUser] = useState();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [questions, setQuestions] = useState([]);
  

  useEffect(() => {
    getuserData();
    fetchQuestions();
  }, [userId]);
  const getuserData = async ()=>{
    const response = await getUserDetails(userId);
    if(response?.status === 200)
    {
      setUser(response?.data)
    }
  }
  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      if (response?.data !== null) {
        setQuestions(response?.data?.slice(0, 10)); // Get only the latest 10 questions
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch questions.");
    }
  };


  const handlePostQuery = async () => {
    if (!questionTitle || !questionBody || !questionTags) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const queryData = {
      questionTitle,
      questionBody,
      questionTags: questionTags.split(",").map((tag) => tag.trim()),
      userPosted: user?.user?.name,
      userId,
    };


    try {
      const response = await uploadAUserQuery(queryData);
      if (response?.status === 200) {
        Alert.alert("Success", "Your query has been posted!");
        setQuestionTitle("");
        setQuestionBody("");
        setQuestionTags("");
        fetchQuestions(); // Refresh the questions list after posting
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to post query. Try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {/* Recent Questions */}
        <Text style={styles.sectionTitle}>Recent Questions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.questionScroll}>
          {questions.map((item) => (
            <View key={item.id} style={styles.questionCard}>
              <Text style={styles.questionTitle}>{item.questionTitle}</Text>
              <Text style={styles.questionBody} numberOfLines={4}>
                {item.questionBody}
              </Text>
              <View style={styles.postedCon}>
                <Image source={{ uri: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=800" }} style={{ width: 30, height: 30, borderRadius: 15, borderColor: "white", borderWidth: 2 }} />

                <TouchableOpacity >
                  <Text numberOfLines={1} style={styles.userText}>Posted by :{item?.userPosted}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* "See All" Button */}
        <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate("All-Questions" , {navigation : navigation,
          user:user
        })}>
          <Text style={styles.seeAllText}>See All Questions</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Post a Query</Text>
      <View>
        <Text style={styles.label}>Question Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter question title"
          placeholderTextColor="#aaa"
          value={questionTitle}
          onChangeText={setQuestionTitle}
        />
      </View>

      <View>
        <Text style={styles.label}>Question Details</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter question details"
          placeholderTextColor="#aaa"
          multiline
          numberOfLines={4}
          value={questionBody}
          onChangeText={setQuestionBody}
        />
      </View>

      <View>
        <Text style={styles.label}>Tags (comma separated)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tags (comma separated)"
          placeholderTextColor="#aaa"
          value={questionTags}
          onChangeText={setQuestionTags}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePostQuery}>
        <Text style={styles.buttonText}>Post Query</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",

    marginVertical: 20,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  questionScroll: {
    flexDirection: "row",
  },
  questionCard: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    width: 200,
    height: 180
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  questionBody: {
    fontSize: 14,
    color: "#ccc",
  },
  seeAllButton: {
    marginTop: 10,
    alignItems: "center",
  },
  seeAllText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  userText: {
    fontSize: 11,
    color: "gray",
    fontWeight: 600
  },
  postedCon: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default UserQueries;
