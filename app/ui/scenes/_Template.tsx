import React from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const GenericScreen: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <Title>I am a screen</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GenericScreen;
