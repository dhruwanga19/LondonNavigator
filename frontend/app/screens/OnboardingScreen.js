import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Theme } from "../styling/Theme";
import { useAuth } from "../navigation/AuthContext";

const OnboardingScreen = ({ navigation }) => {
  const { continueWithoutSigningIn } = useAuth();

  return (
    <ImageBackground
      source={require("../assets/images/chat-bg3.jpg")} // Update this path
      style={{ flex: 1 }}
      resizeMode="cover" // Cover the entire screen
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "Inter-Bold",
              fontWeight: "bold",
              fontSize: 30,
              color: "#20315f",
            }}
          >
            London City Navigator
          </Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 250, height: 250 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        ></View>
        <TouchableOpacity
          style={{
            backgroundColor: Theme.colors.primary,
            padding: 20,
            width: "90%",
            borderRadius: 10,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Roboto-MediumItalic",
            }}
          >
            Sign In or Register
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={22}
            color={Theme.colors.primaryText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Theme.colors.primary,
            padding: 20,
            width: "90%",
            borderRadius: 10,
            marginBottom: 50,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => {
            continueWithoutSigningIn();
            // navigation.navigate("Get Started");
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Roboto-MediumItalic",
            }}
          >
            Continue Without Signing In
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={22}
            color={Theme.colors.primaryText}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 150,
  },
});

export default OnboardingScreen;
