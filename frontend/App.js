import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./app/navigation/AuthStackNavigator";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { AuthProvider, useAuth } from "./app/navigation/AuthContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

function App() {
  // Load fonts here
  let [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./app/styling/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./app/styling/Roboto-MediumItalic.ttf"), // Update the path
    "Inter-Bold": require("./app/styling/Inter-Bold.ttf"),
    // Include other fonts here as needed
  });

  useEffect(() => {
    const prepare = async () => {
      // Wait for fonts to load or any other tasks
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Wait for fonts to load before rendering the app
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}

// Extract the main content into a separate component to utilize useContext or useAuth hook
const AppContent = () => {
  const { isAuthenticated } = useAuth(); // Utilize the context to manage authentication state

  return isAuthenticated ? <DrawerNavigator /> : <AuthStack />;
};

export default App;
