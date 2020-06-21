import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Projects from "../screens/Projects";
import Header from "./Header";

export type RootStackParamList = {
  Projects: undefined;
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
