import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Paragraph } from "react-native-paper";

import { Project } from "../../types/Project";
import { theme } from "../style/theme";

const noProjects = {
  title: "Hello!",
  description: "No audio description projects yet",
} as Partial<Project>;

const ProjectCard = ({
  project,
  action,
  onEdit,
}: {
  project?: Project;
  action: () => void;
  onEdit?: (project: Project) => void;
}) => {
  const [num, setNum] = useState(0);
  const { title, description = " ", coverImageFile } = project ?? noProjects;

  const coverImage = coverImageFile
    ? `file://${coverImageFile}`
    : `https://picsum.photos/360/200?${num}`;

  return (
    <Card style={styles.container} onPress={action}>
      <View>
        <Card.Cover source={{ uri: coverImage }} />
        {!project && (
          <IconButton
            icon="refresh"
            color={theme.colors.surface}
            size={22}
            onPress={() => {
              setNum(Math.random());
            }}
            style={styles.refresh}
          />
        )}
      </View>

      <Card.Title title={title} titleStyle={styles.cardTitle} />

      <Card.Content>
        <Paragraph>{description}</Paragraph>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        {onEdit && project && (
          <Button
            color={theme.colors.secondary}
            uppercase={false}
            onPress={() => {
              onEdit(project);
            }}
          >
            Edit
          </Button>
        )}
        <Button uppercase={false} onPress={action}>
          {!!project ? "Open" : "Start a Project"}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    margin: 8,
  },
  cardTitle: {
    fontSize: 16,
  },
  actions: {
    justifyContent: "flex-end",
  },
  refresh: {
    position: "absolute",
    margin: 4,
    right: 0,
    top: 0,
    opacity: 0.5,
  },
});

export default ProjectCard;
