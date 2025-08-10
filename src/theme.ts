import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Define primary (blue) and secondary (red) colors using tokens
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          light: { value: "#bbdefb" }, // Light blue (primary light)
          500: { value: "#1e88e5" },  // Standard blue (primary)
          dark: { value: "#0a36b1" },  // Dark blue (primary dark)
        },
        secondary: {
          light: { value: "#ffccbc" }, // Light red (secondary light)
          500: { value: "#f44336" },  // Standard red (secondary)
          dark: { value: "#d32f2f" },  // Dark red (secondary dark)
        },
        border: { value: "#F9F9F9" }
      },
      fonts: {
        hero: { value: "DM Sans" }
      }
    },
  },
});

// Create the system with the default config and your custom theme
export const system = createSystem(defaultConfig, config);
