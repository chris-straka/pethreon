import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


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
