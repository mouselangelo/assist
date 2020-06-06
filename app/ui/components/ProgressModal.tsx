import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ProgressBar,
  Modal,
  Portal,
  Button,
  Provider,
  Card,
  Caption,
} from "react-native-paper";
import {} from "react-native-paper";

const getName = (stage: string) => {
  switch (stage) {
    case "audio":
      return "Extracting Audio...";
    default:
      return null;
  }
};

const ProgressModal: React.FC<{
  progress: number;
  stage: string;
}> = ({ progress, stage }) => {
  const stageName = getName(stage);
  if (!stageName) {
    return null;
  }
  return (
    <Provider>
      <Portal>
        <Modal visible={true} dismissable={false}>
          <Card style={styles.card}>
            <Card.Title title="Generate Subtitles" />
            <Card.Content>
              <ProgressBar progress={progress} />
              <View style={styles.info}>
                <Caption>{stageName}</Caption>
                <Caption style={styles.progress}>50%</Caption>
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth: 400,
    alignSelf: "center",
  },
  info: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  progress: {
    fontWeight: "600",
  },
});

export default ProgressModal;
