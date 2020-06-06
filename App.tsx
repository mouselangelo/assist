import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { expo } from "./app.json";
import App from "./app/App";

// https://coolors.co/000000-14213d-fca311-e5e5e5-ffffff
// #000000
// #14213D
// #FCA311
// #E5E5E5
// #FFFFFF

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
