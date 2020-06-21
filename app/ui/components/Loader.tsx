import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../style/theme";

const Loader = ({ isLoading = true }: { isLoading?: boolean }) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={theme.colors.accent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    backgroundColor: "#00000055",
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
});

export default Loader;
