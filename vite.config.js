// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    
    // Configuración extendida de Vitest
    test: {
        environment: "jsdom",
        // 1. Permite usar funciones globales como 'describe', 'it', 'expect', y 'vi'
        globals: true,
        // 2. Carga un archivo de configuración antes de cada prueba
        //    (Necesario para usar 'toBeInTheDocument' de React Testing Library)
        setupFiles: './src/setupTests.js',
    },
})