import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 현재 모드에 따라 환경 변수 로드 (development, production 등)
  const env = loadEnv(mode, process.cwd());

  console.log('Loaded Environment Variables:', env);

  return {
    plugins: [vue()],
    base: '/', // GitHub Pages 배포용 base 경로 설정
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: env.VITE_IP_ADDRESS || 'localhost', // .env 파일에서 VITE_IP_ADDRESS 사용
      port: Number(env.VITE_PORT) || 3000,     // .env 파일에서 VITE_PORT 사용
    },
    define: {
      'process.env': env, // .env 값들을 process.env로 사용할 수 있도록 정의
    },
  };
});
