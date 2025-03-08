import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Dimensions, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getCareerStepDetails } from "../../../api/apiCalls";

const { width } = Dimensions.get("window");

const CareerGuidanceScreen = () => {
  const [expanded, setExpanded] = useState(null);
  const [careerSteps, setCareerSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCareerStepDetails();
        if (response?.status === 200) {
          setCareerSteps(response?.data);
        }
      } catch (error) {
        console.error("Error fetching career data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
    setCurrentIndex(0); // Reset image index when switching sections
  };

  const getExpandedImages = () => {
    const step = careerSteps.find((item) => item.stepId === expanded);
    return step?.images || [];
  };

  const handleNext = () => {
    const images = getExpandedImages();
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Career Guidance</Text>

      <FlatList
        data={careerSteps}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={() => toggleExpand(item.stepId)}>
              <Text style={styles.title}>{item.title}</Text>
              <Icon
                name={expanded === item?.stepId ? "chevron-up-outline" : "chevron-down-outline"}
                size={22}
                color="#f39c12"
              />
            </TouchableOpacity>

            {expanded === item?.stepId && (
              <>
                <View style={styles.imageContainer}>
                  <FlatList
                    ref={flatListRef}
                    data={item?.images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    onMomentumScrollEnd={(event) => {
                      const index = Math.round(event.nativeEvent.contentOffset.x / width);
                      setCurrentIndex(index);
                    }}
                    renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
                  />

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0} style={styles.button}>
                      <Text style={styles.buttonText}>◀ </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleNext}
                      disabled={currentIndex === getExpandedImages().length - 1}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}> ▶</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.description}>{item.description}</Text>
                {item?.links?.map((link, index) => (
                  <TouchableOpacity key={index} onPress={() => Linking.openURL(link)}>
                    <Text style={styles.link}>🔗 Learn More</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f39c12",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f1c40f",
  },
  description: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 8,
  },
  link: {
    fontSize: 14,
    color: "#3498db",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    width: width - 40,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    width:"100%"
  },
  button: {
    backgroundColor: "#f39c12",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CareerGuidanceScreen;
