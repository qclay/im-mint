import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  //breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: "Fira Sans Condensed",
    body: "Fira Sans Condensed",
    cursive: "Monoton", 
    monospace: "Share Tech Mono",
  },
  textStyles: {
    menuitems: {
      //semibold 600
      fontFamily: "heading",
      fontWeight: "600",
      fontSize: "lg",
      color: "white",
    },

    normalbody: {
      //light 300
      fontFamily: "body",
      fontWeight: "300",
      fontSize: "xl",
      color: "white",
    },

    emphasis: {
      //extrabold 800 italic
      fontFamily: "Mountains of Christmas",
      fontWeight: "800",
      fontSize: "xl",
      fontStyle: "italic",
      color: "white",
    },

    subheads: {
      fontFamily: "cursive",
      fontWeight: "700",
      fontSize: "6xl",
      color: "white",
      textTransform: "uppercase",
      lineHeight: "100%",
    },

    clock: {
      fontFamily: "monospace",
      fontWeight: "400",
      fontSize: "5xl",
      color: "white",
      textTransform: "uppercase",
      lineHeight: "100%",
    },
  },
  colors: {
    gold: {
      50: "#47bae1",
      100: "#47bae1",
      200: "#47bae1",
      300: "#47bae1",
      400: "#47bae1",
      500: "#d62b2b", // brand
      600: "#47bae1",
      700: "#47bae1",
      800: "#47bae1",
      900: "#47bae1", 
    },
    steelblue: {
      50: "#252525",
      100: "#252525",
      200: "#252525",
      300: "#252525",
      400: "#252525",
      500: "#252525", //brands
      600: "#252525",
      700: "#252525",
      800: "#070b0e",
      900: "#070b0e",
    },
    neutral: {
      500: "#96825e", //neutral color
    },
    darkgray: {
      500: "#333333", //for text on white, use this instead of black
    },
  },
  // components: { Button: { baseStyle: { _focus: { boxShadow: "none", border: "none" } } } },//this only disables highlighting of selected components
});

const myBreakpoints = createBreakpoints({
  sm: "30em",
  md: "56em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

theme.breakpoints = myBreakpoints;

export default theme;
