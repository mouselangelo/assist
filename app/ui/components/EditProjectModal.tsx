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

import I18n from "../../i18n";
import { saveProject } from "../../logic/projects";
import { Project } from "../../types/Project";
import { theme } from "../style/theme";
import ConfirmDialog from "./ConfirmDialog";
import Loader from "./Loader";
import VideoPreview from "./VideoPreview";

type Props = {
  project: Project;
  onDone: () => void;
  onDelete: () => void;
};

const EditProjectModal: React.FC<Props> = ({ project, onDone, onDelete }) => {
  const {
    videoFile,
    title: projectTitle,
    description: projectDescription,
  } = project;

  const [currentProject, setCurrentProject] = useState(project);
  const isEditing = !!currentProject._id;

  const [title, setTitle] = useState(projectTitle);
  const [description, setDescription] = useState(projectDescription);
  const [loading, setLoading] = useState(false);
  const [hasUnsavedChanged, setHasUnsavedChanges] = useState(!isEditing);
  const [showDelete, setShowDelete] = useState(false);

  const primarySaveAction = isEditing ? "Save" : I18n.t("projects.create");
  const primaryAction = hasUnsavedChanged ? primarySaveAction : "Done";

  const onSave = async () => {
    if (hasUnsavedChanged) {
      setLoading(true);
      try {
        const savedProject = await saveProject({
          project: {
            ...currentProject,
            videoFile,
            title: title,
            description: description,
          },
        });

        if (savedProject && savedProject.location && savedProject._id) {
          setHasUnsavedChanges(false);
          setCurrentProject(savedProject);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
      if (!isEditing) {
        onDone();
      }
    } else {
      onDone();
    }
  };

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
              {isEditing && (
                <Appbar.Action
                  icon="delete-outline"
                  onPress={() => {
                    setShowDelete(true);
                  }}
                />
              )}
              <Appbar.Action
                icon="close"
                onPress={() => {
                  onDone();
                }}
              />
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
                  onPress={onSave}
                >
                  {primaryAction}
                </Button>
              </Card.Actions>
            </Card>
          </View>
          {loading && <Loader isLoading={loading} />}
          {showDelete && (
            <ConfirmDialog
              title="Delete Project?"
              message={`Are you sure your want to delete ${
                title ? "project '" + title + "'" : "this project"
              }?`}
              primaryAction={{
                title: "Cancel",
                onPress: () => {
                  setShowDelete(false);
                },
              }}
              secondaryAction={{
                title: "Delete",
                onPress: () => {
                  setShowDelete(false);
                  onDelete();
                },
              }}
            />
          )}
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
