/// <reference types="vitest/config" />
import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type UserConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import svgrPlugin from 'vite-plugin-svgr';
import { type InlineConfig } from 'vitest/node';

interface VitestExtendedConfig extends UserConfig {
  test: InlineConfig;
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    test: {
      include: ['src/**/*.test.{ts,tsx}'],
      globals: true,
      environment: 'jsdom',
    },
    define: {
      global: 'globalThis',
    },
    server: {
      proxy: {
        '/api/v1': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: true,
          ws: true,
        },
      },
      ...(command === 'serve' && {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
        },
      }),
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
  } as VitestExtendedConfig;
});
