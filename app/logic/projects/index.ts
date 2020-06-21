import { importVideo, selectProjectLocation } from "../../helpers/file";
import path from "path";
import fs from "fs";
import { Project } from "../../types/Project";
import db from "../../data";
import { generateCoverImage } from "../../helpers/ffmpeg";

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
  project.location = await saveProjectToDisk(project);
  if (!project.location) {
    return;
  }
  project.coverImageFile = await saveCoverImageToDisk(project);
  const { _id: projectId } = project;
  if (!projectId) {
    return (await db.collection("projects").insert(project))[0];
  } else {
    await db.collection("projects").update({ _id: projectId }, project);
  }
};

const saveProjectToDisk = async (project: Project) => {
  const projectLocation =
    project.location ?? (await selectProjectLocation(project.title));
  if (!projectLocation) {
    return;
  }
  fs.writeFileSync(projectLocation, JSON.stringify(project, null, 2));
  return projectLocation;
};

const saveCoverImageToDisk = async (project: Project) => {
  const { root, dir } = path.parse(project.location!);
  const target = path.join(root, dir, "cover.png");
  const args = { target, source: project.videoFile };
  console.log(args);
  return await generateCoverImage(args);
};
