import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";

import { Project } from "../../types/Project";

import Projects from "../screens/Projects";

export type RootStackParamList = {
  Projects: undefined;
  EditProject: { project: Project };
};

const Stack = createStackNavigator<RootStackParamList>();

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
    </Stack.Navigator>
  );
};

export default RootStack;
