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
