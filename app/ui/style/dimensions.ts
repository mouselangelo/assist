import { isMobile } from "../../lib/device";

export const navBar = {
  height: isMobile ? 64 : 44,
  paddingTop: isMobile ? 22 : 0,
};
