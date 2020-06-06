import React from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

export type Props = {
  navigation: any;
  route: {
    params: { file: string; title?: string };
  };
};

const EditProject: React.FC<Props> = (props) => {
  console.log(props);
  const { file, title } = props.route.params;
  console.log(file, title);
  return (
    <View style={styles.container}>
      <Title>{title ?? "Untitled"}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditProject;
