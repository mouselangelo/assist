import { NotSupportedError } from "../../lib/errors";

export const importVideo = async (): Promise<string> => {
  throw new NotSupportedError();
};
