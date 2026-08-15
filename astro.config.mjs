// https://astro.build/config

import { defineConfig } from "astro/config"
import node from "@astrojs/node"
import vue from "@astrojs/vue"
import icon from "astro-icon"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  integrations: [vue(), icon()],

  vite: {
    plugins: [tailwindcss()]
  }
})
