import React from "react";
import { StyleSheet, View } from "react-native";
import RootStack from "./ui/navigation/RootNavigationStack";

const App: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <RootStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
