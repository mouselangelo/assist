import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Modal,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";

import i18n from "../../i18n";
import { saveProject } from "../../logic/projects";
import { Project } from "../../types/Project";
import { theme } from "../style/theme";
import Loader from "./Loader";
import VideoPreview from "./VideoPreview";

const EditProjectModal: React.FC<{ project: Project }> = ({ project }) => {
  const {
    videoFile,
    title: projectTitle,
    description: projectDescription,
    _id: projectId,
    location: projectLocation,
  } = project;

  const isEditing = !!projectId;

  const [title, setTitle] = useState(projectTitle);
  const [description, setDescription] = useState(projectDescription);

  const [didEdit, setDidEdit] = useState(false);
  const [didSave, setDidSave] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [projectFile, setProjectFile] = useState<string | undefined>(
    projectLocation
  );

  const showDiscard = !didSave || didEdit;
  const projectCreated = !!projectFile;

  return (
    <Provider theme={theme}>
      <Portal>
        <Modal
          visible={true}
          dismissable={false}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.container}>
            <Appbar.Header style={styles.header}>
              <Appbar.Content title="Project Details" />
              {showDiscard && <Appbar.Action icon="close" onPress={() => {}} />}
            </Appbar.Header>
            <Card style={styles.card}>
              <View style={styles.videoContainer}>
                <VideoPreview file={videoFile} height={320} />
              </View>
              <Card.Content>
                <TextInput
                  label="Title"
                  placeholder="I can see ..."
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                    setDidEdit(true);
                    setDidSave(false);
                  }}
                  style={styles.input}
                />
                <TextInput
                  label="Description (optional)"
                  placeholder="It's gonna be a bright, sun-shiny day..."
                  multiline={true}
                  numberOfLines={3}
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                    setDidEdit(true);
                  }}
                  style={styles.input}
                />
              </Card.Content>
              <Card.Actions
                style={[
                  styles.actions,
                  {
                    justifyContent: showDiscard ? "space-between" : "flex-end",
                  },
                ]}
              >
                {showDiscard && (
                  <Button
                    theme={{ colors: { primary: theme.colors.negative } }}
                    onPress={() => {
                      if (didEdit) {
                        // show alert
                        console.log("discard alert");
                      } else {
                        console.log("dismiss modal");
                      }
                    }}
                  >
                    Discard
                  </Button>
                )}
                <Button
                  theme={{ colors: { primary: theme.colors.positive } }}
                  onPress={async () => {
                    if (!projectCreated || didEdit) {
                      setIsSaving(true);
                      const savedProject = await saveProject({
                        project: {
                          ...project,
                          videoFile,
                          title: title,
                          description: description,
                        },
                      });
                      if (savedProject) {
                        project = savedProject;
                      }
                      setIsSaving(false);
                      setProjectFile(project.location);
                      if (projectFile) {
                        setDidEdit(false);
                        setDidSave(true);
                      }
                      console.log({ project, savedProject, projectFile });
                    } else {
                      console.log("done");
                    }
                  }}
                >
                  {projectCreated
                    ? didEdit
                      ? "Save"
                      : "Done"
                    : i18n.t("projects.create")}
                </Button>
              </Card.Actions>
            </Card>
          </View>
          {isSaving && <Loader isLoading={isSaving} />}
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginBottom: 60,
  },
  container: {
    alignItems: "center",
  },
  header: {
    width: 600,
    height: 48,
  },
  card: {
    width: 600,
    minHeight: 600,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  videoContainer: {
    margin: 16,
    borderWidth: 8,
    borderColor: theme.colors.background,
    borderRadius: 1,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  input: {
    backgroundColor: theme.colors.lightBackground,
    marginBottom: 10,
  },
  actions: {
    justifyContent: "space-between",
  },
});

export default EditProjectModal;
