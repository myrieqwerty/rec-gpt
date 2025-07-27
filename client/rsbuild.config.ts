import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: process.env.FRONTEND_PORT ? Number(process.env.FRONTEND_PORT) : 3000
  }
});
