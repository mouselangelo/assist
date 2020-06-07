import { importVideo, selectProjectLocation } from "../../helpers/file";
import path from "path";
import fs from "fs";
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
  if (!projectFile) {
    return;
  }
  console.log(projectFile);
  fs.writeFileSync(projectFile, JSON.stringify(project, null, 2));
  return projectFile;
};
