import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { navBar } from "../style/dimensions";

export type NavigationAction = {
  title: string;
  action: typeof Button.prototype.props.onPress;
  icon?: string;
};

const NavigationBar = ({ actions }: { actions: NavigationAction[] }) => {
  return (
    <View style={styles.actions}>
      {actions.reverse().map(({ title, action, icon }) => (
        <Button compact uppercase={false} icon={icon} onPress={action}>
          {title}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  actions: {
    paddingTop: navBar.paddingTop,
    backgroundColor: "#c0c0c0",
    flex: 1,
    maxHeight: navBar.height,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default NavigationBar;
