import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Button } from "react-native-paper";

type Props = {
  navigation: any;
};

const Projects: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Title>Projects</Title>
      <Button
        onPress={() => {
          console.log("go to EditProject", navigation);
          navigation.navigate("EditProject");
        }}
      >
        Edit Project
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Projects;
