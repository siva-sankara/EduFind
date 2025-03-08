import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import Ionicons from 'react-native-vector-icons/AntDesign'
import { downVoteAQuestion, postAnswerToAQuestion, upVoteAQuestion } from "../../../api/apiCalls";

const EachQuestionScreen = ({ route }) => {

  const { data, user } = route?.params;

  const [newAnswer, setNewAnswer] = useState("");
  const [questionVotes, setQuestionVotes] = useState(data?.votes || 0);
  const [answers, setAnswers] = useState(
    data?.answer?.map((ans) => ({ ...ans })) || []
  );


  const [questionVoteStatus, setQuestionVoteStatus] = useState(null); // "up" or "down"
  // Handle upvote/downvote for the question
  const handleQuestionVote = async (type) => {
    const payload = {
      userId: user?.user?.id
    }
    if (type === "up") {
      const response = await upVoteAQuestion(data?._id, payload);
      if (response?.status === 200) {
        ToastAndroid.show("You upvoted to this question!");
      }
    }
    else {
      const response = await downVoteAQuestion(data?._id, payload);
      if (response?.status === 200) {
        ToastAndroid.show("You down voted this question!");
      }
    }
    setQuestionVotes((prevVotes) => {
      if (questionVoteStatus === type) {
        return prevVotes; // Prevents duplicate voting
      } else if (questionVoteStatus) {
        return type === "up" ? prevVotes + 2 : prevVotes - 2; // Reverse previous vote & apply new
      }
      return type === "up" ? prevVotes + 1 : prevVotes - 1;
    });
    setQuestionVoteStatus(type);
  };

  const handlePostAnswer = async () => {
    if (newAnswer.trim() === "") return;
    const newAnswerObj = {
      noOfAnswers: 1,
      answerBody: newAnswer,
      userAnswered: user?.user?.name,
      userId: user?.user?.id,
      answeredOn: new Date().toISOString(),
    }
    const response = await postAnswerToAQuestion(data?._id, newAnswerObj)
    if (response?.status === 200) {
      setAnswers([...answers, newAnswerObj]);
      setNewAnswer("");
    }

  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Question Details */}
        <View style={styles.questionContainer}>
          <View style={{ width: "85%" }}>
            <Text style={styles.questionTitle}>{data?.questionTitle}</Text>
            <Text style={styles.questionBody}>{data?.questionBody}</Text>
            <View style={styles.tagsContainer}>
              {data?.questionTags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
            <Text style={styles.metaText}>
              Posted by: {data?.userPosted} • {new Date(data?.askedOn).toLocaleString()}
            </Text>
          </View>
          {/* Upvote/Downvote Section for Question */}
          <View style={styles.voteContainer}>
            <TouchableOpacity onPress={() => handleQuestionVote("up")}>
              <Ionicons name="upcircle" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={styles.voteCount}>{questionVotes}</Text>
            <TouchableOpacity onPress={() => handleQuestionVote("down")}>
              <Ionicons name="downcircle" size={24} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Answers List */}
        <Text>Answers :</Text>
        <FlatList
          data={answers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{item?.answerBody}</Text>
              <Text style={styles.answerMeta}>
                By: {item?.userAnswered} • {new Date(item?.answeredOn).toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noAnswersText}>No answers yet.</Text>}
        />
      </ScrollView>

      {/* Fixed Input Box for Answering */}
      <View style={styles.answerInputContainer}>
        <TextInput
          value={newAnswer}
          onChangeText={setNewAnswer}
          placeholder="Type your answer here..."
          placeholderTextColor="#aaa"
          style={styles.answerInput}
          multiline
        />
        <TouchableOpacity onPress={handlePostAnswer} style={styles.postAnswerButton}>
          <Text style={styles.postAnswerButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    backgroundColor: "#222",
    width: "100%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  questionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  questionBody: {
    color: "#bbb",
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#007aff",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  metaText: {
    color: "#888",
    fontSize: 12,
    marginTop: 6,
  },
  voteContainer: {
    // flexDirection: "col",
    width: "10%",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  voteCount: {
    color: "#fff",
    fontSize: 16,
  },
  answerContainer: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#444",
  },
  answerText: {
    color: "#fff",
    fontSize: 16,
  },
  answerMeta: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 6,
  },
  noAnswersText: {
    color: "#777",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  answerInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#333",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  answerInput: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  postAnswerButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  postAnswerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EachQuestionScreen;
