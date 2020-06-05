import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ProgressModal: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subtitles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 480,
    height: 90,
    backgroundColor: "#fffe",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 80,
    zIndex: 100,
    borderRadius: 8,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProgressModal;
