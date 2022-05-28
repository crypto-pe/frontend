// https://chakra-ui.com/guides/integrations/with-framer

import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === "children"
});

export const MotionFlex = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === "children",
  baseStyle: {
    display: "flex"
  }
});
