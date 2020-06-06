import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { expo } from "./app.json";
import TestApp from "./app/TestApp";
import App from "./app/App";
import { NavigationContainer } from "@react-navigation/native";

// https://coolors.co/000000-14213d-fca311-e5e5e5-ffffff
// #000000
// #14213D
// #FCA311
// #E5E5E5
// #FFFFFF

const isTesting = false;

const MainApp = () => {
  return isTesting ? <TestApp /> : <App />;
};

export default function Main() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
