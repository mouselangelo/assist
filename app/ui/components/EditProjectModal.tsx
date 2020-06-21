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
import I18n from "../../i18n";

type Props = { project: Project; onDone: () => void };
const EditProjectModal: React.FC<Props> = ({ project, onDone }) => {
  const {
    videoFile,
    title: projectTitle,
    description: projectDescription,
    location: projectLocation,
  } = project;

  const isNewProject = !!project._id;

  const [currentProject, setCurrentProject] = useState(project);
  const isEditing = !!currentProject._id;

  const [title, setTitle] = useState(projectTitle);
  const [description, setDescription] = useState(projectDescription);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanged, setHasUnsavedChanges] = useState(!isEditing);

  const primarySaveAction = isEditing ? "Save" : I18n.t("projects.create");
  const primaryAction = hasUnsavedChanged ? primarySaveAction : "Done";

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
              {!hasUnsavedChanged && (
                <Appbar.Action
                  icon="close"
                  onPress={() => {
                    onDone();
                  }}
                />
              )}
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
                    setHasUnsavedChanges(true);
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
                    setHasUnsavedChanges(true);
                  }}
                  style={styles.input}
                />
              </Card.Content>
              <Card.Actions
                style={[
                  styles.actions,
                  {
                    justifyContent: hasUnsavedChanged
                      ? "space-between"
                      : "flex-end",
                  },
                ]}
              >
                {hasUnsavedChanged && (
                  <Button
                    uppercase={false}
                    theme={{ colors: { primary: theme.colors.negative } }}
                    onPress={() => {
                      console.log("discard alert");
                    }}
                  >
                    Discard
                  </Button>
                )}
                <Button
                  uppercase={false}
                  theme={{ colors: { primary: theme.colors.positive } }}
                  onPress={async () => {
                    if (hasUnsavedChanged) {
                      setIsSaving(true);
                      const savedProject = await saveProject({
                        project: {
                          ...currentProject,
                          videoFile,
                          title: title,
                          description: description,
                        },
                      });
                      console.log({ savedProject });
                      if (
                        savedProject &&
                        savedProject.location &&
                        savedProject._id
                      ) {
                        setHasUnsavedChanges(false);
                        setCurrentProject(savedProject);
                      }
                      setIsSaving(false);
                      if (!isEditing) {
                        onDone();
                      }
                    } else {
                      onDone();
                    }
                  }}
                >
                  {primaryAction}
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
