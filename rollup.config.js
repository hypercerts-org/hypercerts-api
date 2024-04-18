// rollup.config.js
import typescript from "@rollup/plugin-typescript";

const config = {
  input: "src/api.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [typescript()],
};

export default config;
