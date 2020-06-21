import { DefaultTheme } from "react-native-paper";

// https://coolors.co/000000-14213d-fca311-e5e5e5-ffffff
// #000000
// #14213D
// #FCA311
// #E5E5E5
// #FFFFFF

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#14213D",
    background: "#E5E5E5",
    surface: "#FFFFFF",
    accent: "#FCA311",
    error: "#bb0000",
    text: "#000000",
    disabled: "#444444",
    placeholder: "#24314D",
    lightBackground: "#f9f9f9",
    positive: "#118822",
    negative: "#ff6666",
    secondary: "#666666",
  },
};

/*
primary: "#color",
background: "#color",
surface: "#color",
accent: "#color",
error: "#color",
text: "#color",
onSurface: "#color",
onBackground: "#color",
disabled: "#color",
placeholder: "#color",
backdrop: "#color",
notification: "#color",
*/
