# syntax=docker/dockerfile:1
FROM oven/bun:1.3.9 AS build
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

COPY . .
RUN --mount=type=secret,id=github_token,env=GITHUB_TOKEN bun run build

FROM oven/bun:1.3.9 AS run
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV PORT=3000
ENV HOST=0.0.0.0
CMD ["bun", "run", "./dist/server/entry.mjs"]
