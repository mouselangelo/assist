import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { expo } from "./app.json";
import TestApp from "./app/TestApp";
import App from "./app/App";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./app/ui/style/theme";

const isTesting = false;

const MainApp = () => {
  return isTesting ? <TestApp /> : <App />;
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
