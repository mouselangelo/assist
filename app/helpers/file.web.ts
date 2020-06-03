import * as DocumentPicker from "expo-document-picker";
import { NotSupportedError } from "../lib/errors";

export const importVideo = async () => {
  throw new NotSupportedError();
  const result = await DocumentPicker.getDocumentAsync({
    type: "video/*",
    copyToCacheDirectory: false,
  });
  // result.uri = mime+base64 data
  console.log(result);
};
