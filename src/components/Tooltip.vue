<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from "vue"
import { useMousePosition } from "../composables/useMousePosition"

const { x, y } = useMousePosition()
const tooltip = useTemplateRef("tooltip")
const trigger = useTemplateRef("trigger")
const isShown = ref<boolean>(false)
const { side = "right", focusable = false } = defineProps<{ text: string; side?: "left" | "right"; focusable?: boolean }>()

const place = (left: number, top: number) => {
  if (!tooltip.value) return
  tooltip.value.style.left = `${left}px`
  tooltip.value.style.top = `${top}px`
}

const onHover = () => place(x.value - (side === "left" ? 70 : -30), y.value - 10)

const onMouseEnter = () => {
  isShown.value = true
}
const onMouseLeave = () => {
  isShown.value = false
}

const onFocusIn = async () => {
  isShown.value = true
  await nextTick()
  const rect = trigger.value?.getBoundingClientRect()
  if (!rect) return
  place(side === "left" ? rect.left - 70 : rect.right + 10, rect.bottom + 8)
}
const onFocusOut = () => {
  isShown.value = false
}
</script>

<template>
  <div>
    <Transition>
      <span
        v-if="isShown"
        ref="tooltip"
        role="tooltip"
        class="bg-surface-raised border-border pointer-events-none fixed z-1000 rounded-lg border px-3 py-1 font-semibold text-white transition-opacity duration-100 select-none">
        {{ text }}
      </span>
    </Transition>
    <span
      ref="trigger"
      :tabindex="focusable ? 0 : undefined"
      :aria-label="focusable ? text : undefined"
      class="focus-visible:outline-primary rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
      @mousemove="onHover"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @focusin="onFocusIn"
      @focusout="onFocusOut">
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
