import { NotSupportedError } from "../../lib/errors";

export const importVideo = async (): Promise<string> => {
  throw new NotSupportedError();
};

export const selectProjectLocation = async (title?: string) => {
  throw new NotSupportedError();
};
