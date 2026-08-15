<script setup lang="ts">
import { ref, useTemplateRef } from "vue"
import { useMousePosition } from "../composables/useMousePosition"

const { x, y } = useMousePosition()
const tooltip = useTemplateRef("tooltip")
const isHovered = ref<boolean>(false)
const { side = "right" } = defineProps<{ text: string; side?: "left" | "right" }>()

const onHover = () => {
  if (!tooltip.value) return
  const style = tooltip.value.style
  style.left = `${x.value - (side === "left" ? 70 : -30)}px`
  style.top = `${y.value - 10}px`
}

const onMouseEnter = () => {
  isHovered.value = true
}
const onMouseLeave = () => {
  isHovered.value = false
}
</script>

<template>
  <div>
    <Transition>
      <span
        v-if="isHovered"
        ref="tooltip"
        class="bg-light-bg pointer-events-none fixed z-1000 rounded-lg px-3 py-1 font-semibold text-white transition-opacity duration-100 select-none">
        {{ text }}
      </span>
    </Transition>
    <span @mousemove="onHover" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <slot />
    </span>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
