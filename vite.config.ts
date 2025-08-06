import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            name: "ZippySharedLib",
            fileName: (format) => `zippy-shared-lib.${format}.js`, // Updated
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
});
