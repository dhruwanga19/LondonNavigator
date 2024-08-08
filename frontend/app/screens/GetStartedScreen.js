import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../navigation/AuthContext";

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const { signOut, isHalfAuth } = useAuth();

  return (
    <ImageBackground
      source={require("../assets/images/chat-bg3.jpg")} // Update with your actual background image path
      style={styles.background}
      resizeMode="cover"
    >
      {/* Login/Logout button renders based on user is signIn or bypassed it with continueWithoutSignIn */}
      {isHalfAuth ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            signOut(); // Assuming signOut is a method to log out the user
            // Optionally navigate to a screen after logging out
          }}
        >
          <Text style={styles.backButtonText}>Login/Register</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => signOut()} // Assuming "Login" is the route name for your login screen
        >
          <Text style={styles.backButtonText}>Logout</Text>
        </TouchableOpacity>
      )}

      <View style={styles.overlay}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Chat with London Navigator</Text>
        <Text style={styles.description}>
          London Navigator helps you navigate through London's vast landscape,
          offering personalized recommendations and directions. Tap "Ask a new
          query" to start interacting with the London Navigator and explore the
          city with ease.
        </Text>

        {/* Uncomment to use Aesthetic Button Style 3 */}
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("New Topic +")}
        >
          <Text style={styles.buttonText}>Ask a new query</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: "#ffffff",
    zIndex: 10,
  },
  backButtonText: {
    color: "#ffffff", // White text to contrast the button color
    fontSize: 16,
    fontWeight: "bold",
  },

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // Adding an overlay for better readability
    width: "100%",
    height: "100%",
  },
  image: {
    width: "50%",
    height: 200,
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  button2: {
    backgroundColor: "#2196F3", // Blue
    padding: 15,
    borderRadius: 50,
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GetStartedScreen;
