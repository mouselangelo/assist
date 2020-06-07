import React from "react";
import { Scene as NavigationScreen } from "@react-navigation/stack/lib/typescript/src/types";
import { Route } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { Appbar } from "react-native-paper";
import { isMobile } from "../../lib/device";
import { theme } from "../style/theme";

export type Scene = NavigationScreen<Route<string>>;

const getTitle = (scene: Scene) => {
  const { name } = scene.route;
  const { options } = scene.descriptor;
  const { headerTitle, title } = options;
  return (headerTitle ?? title ?? name).toString();
};

const Header = ({
  scene,
  previous,
  navigation,
}: {
  scene: Scene;
  previous?: Scene;
  navigation: any;
}) => {
  const title = getTitle(scene);

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous && (
        <Appbar.BackAction
          onPress={isMobile ? navigation.pop : navigation.goBack}
          color={theme.colors.primary}
        />
      )}
      <Appbar.Content title={title} color={theme.colors.primary} />
    </Appbar.Header>
  );
};

export default Header;
