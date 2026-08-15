<script setup lang="ts">
import { formatDistance } from "date-fns"
import { ref } from "vue"
import { useIntervalFn } from "../composables/useIntervalFn"
import { LAST_FM_PROFILE } from "../lib/config"
import type { Track } from "../types"
import Tooltip from "./Tooltip.vue"

const props = defineProps<{ track: Track }>()
const track = props.track

const isCurrent = Boolean(track["@attr"]?.nowplaying)
const relativeTime = () => {
  return !isCurrent && formatDistance(new Date(), new Date(Number(track.date.uts) * 1000)) + " ago"
}
const relative = ref<string>(relativeTime() || "NOW")

const image = track.image[2]!["#text"]

useIntervalFn(() => {
  if (isCurrent) return
  relative.value = relativeTime() as string
}, 30_000)
</script>

<template>
  <a :href="LAST_FM_PROFILE" target="_blank">
    <div
      class="bg-surface border-border/60 hover:bg-surface-raised relative h-28 w-72 rounded-lg border transition-colors"
      :style="`--img: url(${image})`">
      <div class="absolute right-0 mt-2 mr-3 flex h-5 items-end gap-0.75" v-if="isCurrent" aria-label="Now playing">
        <span v-for="bar in 3" :key="bar" class="bg-primary w-0.75 rounded-full" />
      </div>
      <p v-else class="text-faint absolute right-0 mt-2 mr-3 font-bold">{{ relative.replace("about", "") }}</p>
      <div class="flex h-full w-full items-center gap-4 px-4">
        <img :src="image" :alt="`${track.name} album art`" class="rounded-lg" width="80" height="80" />
        <div class="flex flex-col justify-center">
          <Tooltip :text="track.name">
            <p class="line-clamp-1 text-lg font-semibold break-all">
              {{ track.name }}
            </p>
          </Tooltip>
          <p class="text-muted text-sm">{{ track.artist["#text"]?.replace("Lisa", "LiSA") }}</p>
          <!-- :^) -->
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
@reference "../styles/main.css";

span {
  height: 40%;
  animation: bounce 1s ease-in-out infinite;
}

span:nth-child(2) {
  animation-duration: 1.4s;
  animation-delay: -0.3s;
}

span:nth-child(3) {
  animation-duration: 0.8s;
  animation-delay: -0.6s;
}

@keyframes bounce {
  0%,
  100% {
    height: 25%;
  }
  50% {
    height: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  span {
    animation: none;
    height: 60%;
  }
}

a > div {
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 15%;
    border-radius: var(--radius-lg);

    background-image: var(--img);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    filter: blur(4px);
    transform: scale(1.1);

    pointer-events: none;
  }
}
</style>
