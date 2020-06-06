import React from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const EditProject: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <Title>Untitled Project</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditProject;
