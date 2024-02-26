// rollup.config.js
import typescript from "@rollup/plugin-typescript";

const config = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [typescript()],
};

export default config;
