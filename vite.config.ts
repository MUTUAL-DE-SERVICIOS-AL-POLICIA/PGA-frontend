import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

const env = loadEnv('', process.cwd());
const { VITE_HOST, VITE_PORT } = env;

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: VITE_HOST || 'localhost',
    port: Number(VITE_PORT) || 3000,
  },
  build: {
    rollupOptions: {
      output: {
        // Divide automáticamente los módulos grandes en chunks independientes
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Agrupa todas las dependencias de node_modules en un solo chunk llamado "vendor"
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Aumenta el límite de advertencia de tamaño a 1000 KB (opcional)
  },
});
