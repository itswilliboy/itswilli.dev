<script setup lang="ts">
import type { Friend } from "../types"
import Tooltip from "./Tooltip.vue"

defineProps<{ friends: Friend[] }>()
</script>

<template>
  <div class="bg-surface border-border/60 flex size-max items-center gap-2 rounded-lg border p-2 shadow-lg shadow-black/20">
    <Tooltip
      :text="friend.name"
      v-for="friend in friends"
      :key="friend.name"
      side="left"
      class="even:[&_img]:hover:-rotate-6">
      <a :href="friend.href" target="_blank">
        <img
          :src="`https://avatars.githubusercontent.com/u/${friend.githubID}`"
          :alt="friend.name"
          class="w-12 rounded-lg transition-[rotate] ease-in-out hover:rotate-6" />
      </a>
    </Tooltip>
  </div>
</template>
