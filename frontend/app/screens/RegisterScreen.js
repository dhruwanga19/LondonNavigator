import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";

import InputField from "../components/InputField";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { Theme } from "../styling/Theme";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handler for registering the user
  const handleRegister = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      // Assuming your Flask server endpoint for registration is '/register'
      const response = await fetch("http://10.0.2.2:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Handle success, perhaps navigate to a login screen or home screen
        Alert.alert("Success", "Registration successful");
        navigation.goBack(); // Adjust according to your navigation setup
      } else {
        // Handle server errors or data issues
        Alert.alert("Registration Failed", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during registration");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/chat-bg3.jpg")} // Use the background image used in other screens
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 25 }}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 30,
              fontWeight: "bold",
              color: Theme.colors.SecondaryText,
              marginBottom: 30,
            }}
          >
            Register
          </Text>

          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "#666",
              marginBottom: 30,
            }}
          >
            Fill in detais to register...
          </Text>

          <InputField
            label={"Full Name"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            onChangeText={(text) => setFullName(text)}
          />

          <InputField
            label={"Email ID"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          <InputField
            label={"Password"}
            icon={
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            onChangeText={(text) => setPassword(text)}
            inputType="password"
          />

          <InputField
            label={"Confirm Password"}
            icon={
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            onChangeText={(text) => setConfirmPassword(text)}
            inputType="password"
          />

          <CustomButton label={"Register"} onPress={handleRegister} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: Theme.colors.primary, fontWeight: "700" }}>
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
