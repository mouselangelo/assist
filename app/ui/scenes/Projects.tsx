import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, IconButton, Paragraph, FAB } from "react-native-paper";

import { createProject } from "../../logic/projects";
import { theme } from "../style/theme";

export type Props = {
  navigation: any;
};

const NoProjectsCard = () => {
  const [num, setNum] = useState(0);
  return (
    <Card style={styles.noProjectsCard}>
      <Card.Cover source={{ uri: `https://picsum.photos/360/200?${num}` }} />
      <Card.Title title="Hello!" titleStyle={styles.cardTitle} />
      <Card.Content>
        <Paragraph>No audio description projects yet</Paragraph>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        <IconButton
          icon="refresh"
          color={theme.colors.accent}
          size={22}
          onPress={() => {
            setNum(Math.random());
          }}
        />
        <Button uppercase={false} onPress={createProject}>
          Start a Project
        </Button>
      </Card.Actions>
    </Card>
  );
};

const Projects: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NoProjectsCard />
      <FAB style={styles.fab} small icon="plus" onPress={createProject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noProjectsCard: {
    maxWidth: 360,
  },
  cardTitle: {
    fontSize: 16,
  },
  actions: {
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Projects;
