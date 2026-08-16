<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useIntervalFn } from "../composables/useIntervalFn"
import type { Option, Track as TrackType } from "../types"
import Track from "./Track.vue"

const track = ref<Option<TrackType>>(null)

const refresh = async () => {
  try {
    const resp = await fetch("/api/tracks?limit=1")
    if (!resp.ok) return

    const tracks = (await resp.json()) as TrackType[]
    track.value = tracks[0] ?? null
  } catch {}
}

onMounted(refresh)
useIntervalFn(refresh, 60_000)
</script>

<template>
  <Track v-if="track" :track="track" :key="`${track.name}:${track.date.uts}`" />
  <div v-else class="bg-surface border-border/60 h-28 w-72 animate-pulse rounded-lg border motion-reduce:animate-none" />
</template>
