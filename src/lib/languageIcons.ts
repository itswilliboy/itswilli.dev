const LANGUAGE_ICONS: Record<string, string> = {
  Python: "skill-icons:python-dark",
  Astro: "skill-icons:astro",
  Go: "skill-icons:golang",
  Vue: "skill-icons:vuejs-dark",
  TypeScript: "skill-icons:typescript",
  Rust: "skill-icons:rust",
  CSS: "skill-icons:css",
  HTML: "skill-icons:html"
}

export const getLanguageIcon = (language?: string | null) => (language && LANGUAGE_ICONS[language]) || "skill-icons:git"

const LANGUAGE_COLOURS: Record<string, string> = {
  Astro: "#BC52EE"
}

export const getLanguageColour = (language?: string | null, fallback?: string | null) =>
  (language && LANGUAGE_COLOURS[language]) || fallback || "#888"
