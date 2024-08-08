import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
// import ChatbotScreen from "../screens/ChatbotScreen";
// import FAQScreen from "../screens/FAQScreen";
// import GetStartedScreen from "../screens/GetStartedScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen name="New Topic +" component={ChatbotScreen} /> */}
      {/* <Stack.Screen name="FAQScreen" component={FAQScreen} /> */}
      {/* <Stack.Screen name="GetStarted" component={GetStartedScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
