import { importVideo, selectProjectLocation } from "../../helpers/file";
import path from "path";
import fs from "fs";
import { Project } from "../../types/Project";

export const startNewProject = async (): Promise<
  Project | null | undefined
> => {
  const videoFile = await importVideo();
  if (!videoFile) {
    return null;
  }

  const { ext, base } = path.parse(videoFile);
  const title = base.replace(ext, "");
  return {
    videoFile,
    title,
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
