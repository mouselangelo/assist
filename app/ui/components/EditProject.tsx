import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import i18n from "../../i18n";

import VideoPreview from "./VideoPreview";
import { RootStackNavigator } from "../navigation";
import { theme } from "../style/theme";
import { saveProject } from "../../logic/projects";
import Loader from "./Loader";

const testFile = "/Users/chetan/Documents/videos/clips/hello-clip.mp4";

const fakeProject = {
  videoFile: testFile,
  title: "blah",
  projectFile: undefined,
};

type Props = RootStackNavigator<"EditProject">;

const EditProject: React.FC<Props> = ({ navigation, route }) => {
  const { videoFile, title } = route.params?.project ?? fakeProject;

  const [projectTitle, setProjectTitle] = useState(title);
  const [description, setDescription] = useState("");
  const [didEdit, setDidEdit] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [projectFile, setProjectFile] = useState<string | undefined>(undefined);

  navigation.addListener("blur", (payload: any) => {
    console.log("blur", payload, navigation);
    if (didEdit) {
      console.log("prevent default");
    }
  });

  const showDiscard = !didSave || didEdit;
  const projectCreated = !!projectFile;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Project Details" />
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
            { justifyContent: showDiscard ? "space-between" : "flex-end" },
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
                  navigation.goBack();
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
      </Card>
      {isCreating && <Loader isLoading={isCreating} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
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
  card: {
    width: 600,
    minHeight: 600,
  },
  input: {
    backgroundColor: theme.colors.lightBackground,
    marginBottom: 10,
  },
  actions: {
    justifyContent: "space-between",
  },
});

export default EditProject;
