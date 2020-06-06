import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";

import Projects from "../scenes/Projects";
import EditProject from "../scenes/EditProject";

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
        options={{ headerTitle: "New Project" }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
