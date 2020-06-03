import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { navBar } from "../style/dimensions";

export type NavigationAction = {
  title: string;
  action: typeof Button.prototype.props.onPress;
};

const NavigationBar = ({ actions }: { actions: NavigationAction[] }) => {
  return (
    <View style={styles.actions}>
      {actions.map(({ title, action }) => (
        <Button title={title} onPress={action} />
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
