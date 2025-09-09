/// <reference types="vitest/config" />
import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import fs from 'fs';
import { type InlineConfig } from 'vitest/node';

interface VitestExtendedConfig extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgrPlugin(),
    mkcert(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg'],
  },
} as VitestExtendedConfig);
