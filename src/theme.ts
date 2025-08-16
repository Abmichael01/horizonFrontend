import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Define primary (blue) and secondary (red) colors using tokens
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          light: { value: "#bbdefb" },  // Light blue (primary light)
          50: { value: "#e3f2fd" },     // Lighter blue
          100: { value: "#bbdefb" },    // Lightest blue
          200: { value: "#90caf9" },    // Lighter blue
          300: { value: "#64b5f6" },    // Lighter blue
          400: { value: "#42a5f5" },    // Slightly lighter than primary 500
          500: { value: "#1e88e5" },    // Standard blue (primary)
          600: { value: "#1976d2" },    // Darker blue
          700: { value: "#1565c0" },    // Even darker blue
          800: { value: "#0d47a1" },    // Darker blue
          900: { value: "#0c36a1" },    // Very dark blue
          dark: { value: "#0a36b1" },   // Dark blue (primary dark)
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
