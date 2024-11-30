import { defineConfig } from "vite"

export default defineConfig({
    plugins: [],
    server: {
        port: 3000
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("gsap"))
                        return "gsap";
                    if (id.includes("pixi"))
                        return "pixi";

                    if (id.includes("loader"))
                        return "loader";
                    if (id.includes("trash-exterminator"))
                        return "trash-exterminator";
                }
            }
        }
    },
    base: "/"
})
