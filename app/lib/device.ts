import { Platform } from "react-native";

export const isElectron =
  navigator.userAgent.toLowerCase().indexOf(" electron/") >= 0;
export const isWeb = !isElectron && Platform.OS === "web";
export const isDesktop = isElectron && Platform.OS === "web";

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const isMobile = isIos || isAndroid;

const osNames: Record<string, string> = {
  darwin: "macOS",
};

export const plaformName = (() => {
  switch (Platform.OS) {
    case "ios":
    case "android":
      return Platform.OS;
    default:
      const platform = process.platform;
      return isDesktop ? osNames[platform] ?? platform : Platform.OS;
  }
})();

export const info = () => {
  const {
    userAgent,
    appName,
    appCodeName,
    appVersion,
    geolocation,
    language,
    languages,
  } = navigator;
  const { arch, title, platform, version, env, argv, versions } = process;
  console.log("info", {
    os: Platform.OS,
    plaformName,
    isWeb,
    isDesktop,
    isElectron,
    isMobile,
    isIos,
    isAndroid,
    userAgent,
    process: {
      arch,
      title,
      platform,
      version,
      versions,
      env,
      argv,
    },
    navigator: {
      appName,
      appCodeName,
      appVersion,
      geolocation,
      language,
      languages,
    },
  });
};
