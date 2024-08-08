import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Theme } from "../styling/Theme";

const initialQuestionsAnswers = [
  {
    category: "Getting Started",
    QAs: [
      {
        id: 1,
        question: "How do I ask my question to assistant?",
        answer:
          'Simply open the app and tap on "Start Conversation" or tap the "New Topic+" button to begin chatting with your assistant.',
        isOpen: false,
      },
      {
        id: 2,
        question: "Do I need an account?",
        answer: "No, you can start chatting without creating an account.",
        isOpen: false,
      },
      {
        id: 3,
        question: "Is my chat history saved?",
        answer: "No, chat history is not stored due to privacy reasons.",
        isOpen: false,
      },
      {
        id: 4,
        question: "How to make an appointment with a clinic?",
        answer:
          "To make an appointment with any clinic mention the clininc name, date and time for the appointment.",
        isOpen: false,
      },
    ],
  },
  // Add more categories and QAs here
];

const FAQScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [questionsAnswers, setQuestionsAnswers] = useState(
    initialQuestionsAnswers
  );

  const toggleAnswerVisibility = (categoryId, questionId) => {
    const updatedQAs = questionsAnswers.map((category) => {
      if (category.category === categoryId) {
        return {
          ...category,
          QAs: category.QAs.map((qa) => {
            if (qa.id === questionId) {
              return { ...qa, isOpen: !qa.isOpen };
            }
            return qa;
          }),
        };
      }
      return category;
    });
    setQuestionsAnswers(updatedQAs);
  };

  const filteredQAs = questionsAnswers
    .map((category) => ({
      ...category,
      QAs: category.QAs.filter(
        (qa) =>
          qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.QAs.length > 0);

  return (
    <ImageBackground
      source={require("../assets/images/chat-bg3.jpg")} // Use the background image used in other screens
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.iconContainer}
          >
            <ImageBackground
              source={require("../assets/images/user-profile.jpg")}
              style={styles.drawerIcon}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>FAQs</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/logo.png")} // Update with the correct path to your logo image
              style={styles.logo}
            />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {filteredQAs.map((category) => (
            <View key={category.category} style={styles.category}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              {category.QAs.map((qa) => (
                <TouchableOpacity
                  key={qa.id}
                  onPress={() =>
                    toggleAnswerVisibility(category.category, qa.id)
                  }
                  style={styles.question}
                >
                  <View style={styles.questionRow}>
                    <Text style={styles.questionText}>{qa.question}</Text>
                    <Text style={styles.toggleIcon}>
                      {qa.isOpen ? "-" : "+"}
                    </Text>
                  </View>
                  {qa.isOpen && <Text style={styles.answer}>{qa.answer}</Text>}
                  {/* <Text style={styles.questionText}>{qa.question}</Text>
                {qa.isOpen && <Text style={styles.answer}>{qa.answer}</Text>} */}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 0,
  },
  content: {
    padding: 20,
  },
  drawerIcon: {
    width: 40,
    height: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Theme.colors.primary, // Primary color for the header
  },
  headerText: {
    color: Theme.colors.primaryText, // White color for text
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  iconContainer: {
    marginLeft: 10,
    marginTop: 30,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  logo: {
    width: 40, // Set the width of your logo
    height: 40, // Set the height of your logo
    borderRadius: 25, // Half of the width or height to make it rounded
    resizeMode: "cover", // Use 'cover' to ensure the logo covers the rounded area
    overflow: "hidden", // Ensures the image does not bleed outside the borderRadius
  },
  question: {
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontWeight: "bold",
  },
  answer: {
    marginTop: 5,
    lineHeight: 20,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleIcon: {
    fontSize: 24, // Adjust size as needed
    fontWeight: "bold",
  },
  // Add more styles as needed
  // Add more styles as needed
});

export default FAQScreen;
