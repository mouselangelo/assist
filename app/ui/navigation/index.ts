import { RootStackParamList } from "./RootNavigationStack";
import { StackScreenProps } from "@react-navigation/stack";

export type RootStackNavigator<
  Scene extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, Scene>;
