import React from "react";
import { Scene } from "@react-navigation/stack/lib/typescript/src/types";
import { Route } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { Appbar } from "react-native-paper";
import { isMobile } from "../../lib/device";

import Projects from "../screens/Projects";
import EditProject from "../screens/EditProject";

const Header = ({
  scene,
  previous,
  navigation,
}: {
  scene: Scene<Route<string>>;
  previous?: Scene<Route<string>>;
  navigation: any;
}) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header>
      {previous && (
        <Appbar.BackAction
          onPress={isMobile ? navigation.pop : navigation.goBack}
        />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

const Stack = createStackNavigator<{
  Projects: undefined;
  EditProject: undefined;
}>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Projects"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        key="projects"
        name="Projects"
        component={Projects}
        options={{ headerTitle: "Projects" }}
      />
      <Stack.Screen
        key="project"
        name="EditProject"
        component={EditProject}
        options={{ headerTitle: "Untitled" }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
