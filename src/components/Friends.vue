<script setup lang="ts">
import type { Friend } from "../types"
import Tooltip from "./Tooltip.vue"

defineProps<{ friends: Friend[] }>()
</script>

<template>
  <div class="bg-light-bg flex size-max items-center gap-2 rounded-lg p-2">
    <Tooltip :text="friend.name" v-for="friend in friends" :key="friend.name" side="left">
      <a :href="friend.href" target="_blank">
        <img
          :src="`https://avatars.githubusercontent.com/u/${friend.githubID}`"
          :alt="friend.name"
          class="w-12 rounded-lg transition-[rotate] ease-in-out hover:rotate-6" />
      </a>
    </Tooltip>

    <a href="https://leo.might-be.gay" target="_blank">
      <img src="/leo_88x31.png" alt="leo" style="image-rendering: crisp-edges" class="h-[31px] w-[88px]" />
    </a>
  </div>
</template>
