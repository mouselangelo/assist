import { Project } from "../types/Project";
import { createDataStore } from "./dataStore";

const collections = {
  projects: createDataStore<Project>("projects"),
};

const db = {
  collection: (name: keyof typeof collections) => collections[name],
};

export default db;
