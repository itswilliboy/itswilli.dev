import { onMounted, onUnmounted } from "vue"

export const useIntervalFn = (fn: () => void, ms: number) => {
  let timeout: ReturnType<typeof setInterval>
  onMounted(() => (timeout = setInterval(fn, ms)))
  onUnmounted(() => clearInterval(timeout))
}
