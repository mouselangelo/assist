import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Title, Card, TextInput, Button } from "react-native-paper";
import { theme } from "../style/theme";
import VideoPreview from "../components/VideoPreview";

const testFile = "/Users/chetan/Documents/videos/clips/hello-clip.mp4";

export type Props = {
  navigation: any;
  route: {
    params: { file: string; title?: string };
  };
};

const EditProject: React.FC<Props> = (props) => {
  const { navigation } = props;
  const { file, title } = props.route.params ?? {
    file: testFile,
    title: "blah",
  };

  const [projectTitle, setProjectTitle] = useState(title);
  const [description, setDescription] = useState("");
  const [didEdit, setDidEdit] = useState(false);

  navigation.addListener("willBlur", (payload: any) => {
    console.log("willBlur", payload, navigation);
    if (didEdit) {
      console.log("prevent default");
    }
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Project Details" />
        <View style={styles.videoContainer}>
          <VideoPreview file={file} height={320} />
        </View>
        <Card.Content>
          <TextInput
            label="Title"
            placeholder="I can see ..."
            value={projectTitle}
            onChangeText={(text) => {
              setProjectTitle(text);
              setDidEdit(true);
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
        <Card.Actions style={styles.actions}>
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
          <Button theme={{ colors: { primary: theme.colors.positive } }}>
            Create Project
          </Button>
        </Card.Actions>
      </Card>
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
