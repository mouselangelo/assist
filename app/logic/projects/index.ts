import { importVideo } from "../../helpers/file";
import path from "path";

export const createProject = async () => {
  const file = await importVideo();
  // read the name & other properties?
  const fileParts = path.parse(file);
  return {
    file,
    title: fileParts.base.replace(fileParts.ext, ""),
  };
};
