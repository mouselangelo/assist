import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";

import { Project } from "../../types/Project";

import Projects from "../scenes/Projects";
import EditProject from "../scenes/EditProject";

export type RootStackParamList = {
  Projects: undefined;
  EditProject: { project: Project };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="EditProject"
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
