import path from "path";

import db from "../../data";
import { generateCoverImage } from "../../helpers/ffmpeg";
import { importVideo, selectProjectLocation } from "../../helpers/file";
import { Project } from "../../types/Project";

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
  const projectLocation =
    project.location ?? (await selectProjectLocation(project.title));

  if (!projectLocation) {
    return;
  }

  project.location = projectLocation;

  if (!project.coverImageFile) {
    project.coverImageFile = await saveCoverImageToDisk(project);
  }

  const { _id: projectId } = project;
  if (!projectId) {
    return (await db.collection("projects").insert(project))[0];
  } else {
    await db.collection("projects").update({ _id: projectId }, project);
    return project;
  }
};

const saveCoverImageToDisk = async (project: Project) => {
  if (!project.location) {
    return;
  }
  const target = path.join(project.location, "cover.png");
  return await generateCoverImage({ target, source: project.videoFile });
};

export const deleteProject = async (project: Project) => {
  console.log(project);
  if (!project._id) {
    throw new Error("Project not found");
  }
  await db.collection("projects").remove({ _id: project._id });
};
