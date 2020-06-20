import { importVideo, selectProjectLocation } from "../../helpers/file";
import path from "path";
import fs from "fs";
import { Project } from "../../types/Project";
import db from "../../data";

export const startNewProject = async (): Promise<Project | undefined> => {
  const videoFile = await importVideo();
  if (!videoFile) {
    return;
  }

  const { ext, base } = path.parse(videoFile);
  const title = base.replace(ext, "");
  return {
    videoFile,
    title,
  };
};

export const saveProject = async ({ project }: { project: Project }) => {
  project.location = await saveProjectToDisk({ project });
  if (!project.location) {
    return;
  }
  const { _id: projectId } = project;
  if (!projectId) {
    return (await db.collection("projects").insert(project))[0];
  } else {
    await db.collection("projects").update({ _id: projectId }, project);
  }
};

const saveProjectToDisk = async ({ project }: { project: Project }) => {
  const projectLocation =
    project.location ?? (await selectProjectLocation(project.title));
  if (!projectLocation) {
    return;
  }
  console.log(projectLocation);
  fs.writeFileSync(projectLocation, JSON.stringify(project, null, 2));
  return projectLocation;
};
