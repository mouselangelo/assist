import { NotSupportedError } from "../../lib/errors";

export const convertToAudio = ({
  file,
  audioFile,
  onProgress,
  onComplete,
  onError,
}: {
  file: string;
  audioFile: string;
  onProgress: (progress: number) => void;
  onComplete: (file: string) => void;
  onError: (error: Error) => void;
}) => {
  throw new NotSupportedError();
};

export const generateCoverImage = async ({ source }: { source: string }) => {
  throw new NotSupportedError();
};

export const getInfo = async ({ file }: { file: string }) => {
  throw new NotSupportedError();
};
