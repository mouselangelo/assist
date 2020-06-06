import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, IconButton, Paragraph, FAB } from "react-native-paper";

import { createProject } from "../../logic/projects";
import { theme } from "../style/theme";

const NoProjectsCard = ({ action }: { action: () => void }) => {
  const [num, setNum] = useState(0);
  return (
    <Card style={styles.noProjectsCard}>
      <View>
        <Card.Cover source={{ uri: `https://picsum.photos/360/200?${num}` }} />
        <IconButton
          icon="refresh"
          color={theme.colors.surface}
          size={22}
          onPress={() => {
            setNum(Math.random());
          }}
          style={styles.refresh}
        />
      </View>
      <Card.Title title="Hello!" titleStyle={styles.cardTitle} />
      <Card.Content>
        <Paragraph>No audio description projects yet</Paragraph>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        <Button uppercase={false} onPress={action}>
          Start a Project
        </Button>
      </Card.Actions>
    </Card>
  );
};

export type Props = {
  navigation: any;
};

const Projects: React.FC<Props> = ({ navigation }) => {
  const createProjectAction = async () => {
    const project = await createProject();
    navigation.navigate("EditProject", project);
  };

  return (
    <View style={styles.container}>
      <NoProjectsCard
        action={async () => {
          await createProjectAction();
        }}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={async () => {
          await createProjectAction();
        }}
      />
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
    justifyContent: "flex-end",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  refresh: {
    position: "absolute",
    margin: 4,
    right: 0,
    top: 0,
    opacity: 0.5,
  },
});

export default Projects;
