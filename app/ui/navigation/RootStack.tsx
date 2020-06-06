import { createStackNavigator } from "react-navigation-stack";

import Projects from "../screens/Projects";
import EditProject from "../screens/EditProject";

export type RootStackParamList = {
  Projects: undefined;
  EditProject: undefined;
};

const RootStack = createStackNavigator(
  {
    Projects: Projects,
    EditProject: EditProject,
  },
  {
    navigationOptions: {},
  }
);

export default RootStack;
