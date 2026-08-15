import { onMounted, onUnmounted, ref } from "vue"

export const useMousePosition = () => {
  const [x, y] = [ref<number>(0), ref<number>(0)]

  const update = (event: { pageX: number; pageY: number }) => {
    x.value = event.pageX
    y.value = event.pageY - window.scrollY
  }

  onMounted(() => {
    window.addEventListener("mousemove", update)
  })
  onUnmounted(() => {
    window.removeEventListener("mousemove", update)
  })

  return { x, y }
}
