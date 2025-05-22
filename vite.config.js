import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "index.html", // 기본 index.html
        main: "src/pages/main/index.html", // 추가 HTML 파일
        health: "src/pages/health/index.html", // 추가 HTML 파일
        cleaning: "src/pages/cleaning/index.html", // 추가 HTML 파일
        study: "src/pages/study/index.html", // 추가 HTML 파일
        // regist: 'src/pages/todo/regist.html', // 추가 HTML 파일
        // info: 'src/pages/todo/info.html', // 추가 HTML 파일
        // 필요한 다른 HTML 파일을 여기에 추가
      },
    },
  },
  appType: "mpa", // fallback 사용안함
  plugins: [tailwindcss()],
});
