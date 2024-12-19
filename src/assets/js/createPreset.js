import { definePreset } from "@primevue/themes";
import Nora from "@primevue/themes/nora";
const MyPreset = definePreset(Nora, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: "#fff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
        primary: {
          color: "{rose.600}",
          inverseColor: "#ffffff",
          hoverColor: "{rose.900}",
          activeColor: "{rose.800}",
        },

        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
      dark: {
        surface: {
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
        primary: {
          color: "{zinc.50}",
          inverseColor: "{zinc.950}",
          hoverColor: "{zinc.200}",
          activeColor: "{zinc.200}",
          background: "{zinc.900}",
        },
      },
    },
  },
});

export default MyPreset;
