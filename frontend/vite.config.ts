import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import eslint from "vite-plugin-eslint"
// plugins: [eslint()]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // I need this to connect to infura.
  // server: {
  //   https: {
  //     key: "",
  //     cert: ""
  //   }
  // }
})
