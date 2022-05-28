import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em"
});

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 6,
    _focus: {
      ring: "2px",
      ringColor: "primary.500"
    }
  },
  variants: {
    unstyled: {
      _focus: {
        ring: 0
      }
    },
    primary: {
      bg: "primary.500",
      color: "light",
      fontWeight: "medium",
      _hover: {
        bg: "primary.600"
      }
    },
    secondary: {
      bg: "none",
      color: "primary.500",
      fontWeight: "medium",
      border: "1px",
      borderColor: "primary.500",
      _hover: {
        bg: "primary.500",
        color: "light"
      }
    },
    outline: {
      bg: "none",
      color: "light",
      fontWeight: "medium",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.300",
        color: "black"
      },
      _active: {
        color: "black"
      }
    }
  }
};

const Input: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 4
  },
  variants: {
    primary: {
      field: {
        bg: "slategray",
        // color: "light",
        _hover: {
          bg: "#3B4655"
        },
        _focus: {
          ring: "1px",
          ringColor: "primary.500",
          ringOffset: "1px",
          ringOffsetColor: "primary.600"
        }
      }
    }
  }
};

const Select: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 4
  },
  variants: {
    primary: {
      field: {
        bg: "slategray",
        // color: "light",
        _hover: {
          bg: "#3B4655"
        }
      }
    }
  }
};

const theme = extendTheme({
  colors: {
    primary: {
      500: "#0C99FF",
      600: "#1A75FF",
      transparent: "#1A75FF12"
    },
    darken: "#21262D",
    black: "#181818",
    light: "#fff",
    slategray: "#2F3845"
  },
  fonts: {
    heading: "'Lexend', sans-serif",
    body: "'Raleway', sans-serif",
    mono: "'Menlo', monospace"
  },
  breakpoints,
  components: {
    Button,
    Input,
    Select,
    IconButton: Button,
    Heading: {
      baseStyle: {
        color: "light"
      }
    },
    Text: {
      baseStyle: {
        color: "light"
      }
    }
  }
});

export default theme;
