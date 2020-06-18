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
  const { videoFile, title } = project;

  const [projectTitle, setProjectTitle] = useState(title);
  const [description, setDescription] = useState("");
  const [didEdit, setDidEdit] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [projectFile, setProjectFile] = useState<string | undefined>(undefined);

  const showDiscard = !didSave || didEdit;
  const projectCreated = !!projectFile;

  return (
    <Provider theme={theme}>
      <Portal>
        <Modal visible={true} dismissable={false}>
          <View style={styles.container}>
            <Appbar.Header style={styles.header}>
              <Appbar.Content title="Project Details" />
            </Appbar.Header>
            <View style={styles.content}>
              <Card style={styles.card}>
                <View style={styles.videoContainer}>
                  <VideoPreview file={videoFile} height={320} />
                </View>
                <Card.Content>
                  <TextInput
                    label="Title"
                    placeholder="I can see ..."
                    value={projectTitle}
                    onChangeText={(text) => {
                      setProjectTitle(text);
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
                      justifyContent: showDiscard
                        ? "space-between"
                        : "flex-end",
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
                      if (!projectCreated) {
                        setIsCreating(true);
                        const project = {
                          videoFile,
                          title: projectTitle,
                          description,
                        };
                        const projectFile = await saveProject({
                          project,
                        });
                        setIsCreating(false);
                        setProjectFile(projectFile);
                        if (projectFile) {
                          setDidSave(true);
                        }
                      } else {
                        if (didEdit) {
                          console.log("save to", projectFile);
                        } else {
                          console.log("done");
                        }
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
                {isCreating && <Loader isLoading={isCreating} />}
              </Card>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  content: {
    backgroundColor: theme.colors.background,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 1,
  },
  header: {
    width: 602,
    height: 48,
  },
  card: {
    width: 600,
    minHeight: 600,
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
