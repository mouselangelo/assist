import { plaformName } from "./device";

export class NotSupportedError extends Error {
  constructor() {
    super(`This isn't supported on the '${plaformName}' platform yet!`);
  }
}
