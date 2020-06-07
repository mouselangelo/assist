import { importVideo, selectProjectLocation } from "../../helpers/file";
import path from "path";
import { Project } from "../../types/Project";

export const startNewProject = async () => {
  const file = await importVideo();
  if (!file) {
    return;
  }
  // read the name & other properties?
  const fileParts = path.parse(file);
  return {
    file,
    title: fileParts.base.replace(fileParts.ext, ""),
  };
};

export const saveProject = async ({ project }: { project: Project }) => {
  const projectFile = await selectProjectLocation(project.title);
  console.log(projectFile);
};
