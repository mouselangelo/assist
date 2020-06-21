import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

import db from "../../data";
import { startNewProject } from "../../logic/projects";
import { Project } from "../../types/Project";
import EditProjectModal from "../components/EditProjectModal";
import ProjectCard from "../components/ProjectCard";
import { RootStackNavigator } from "../navigation";

type Props = RootStackNavigator<"Projects">;

const Projects: React.FC<Props> = ({ navigation }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );

  useEffect(() => {
    const loadData = async () => {
      const projects = await db.collection("projects").find({});
      setProjects(projects);
    };
    loadData();
  }, []);

  const createProjectAction = async () => {
    setIsCreating(true);
    const project = await startNewProject();
    setCurrentProject(project);
    setIsCreating(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            action={async () => {}}
            onEdit={(project) => {
              setCurrentProject(project);
            }}
          />
        )}
        ListEmptyComponent={
          <ProjectCard
            action={async () => {
              await createProjectAction();
            }}
          />
        }
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={async () => {
          await createProjectAction();
        }}
        loading={isCreating}
      />
      {currentProject && <EditProjectModal project={currentProject} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Projects;
