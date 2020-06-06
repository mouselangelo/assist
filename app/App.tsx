import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBrowserApp } from "@react-navigation/web";

import RootStack from "./ui/navigation/MainNavigationStack";

const Main =
  Platform.OS === "web"
    ? createBrowserApp(RootStack)
    : createAppContainer(RootStack);

const App: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
