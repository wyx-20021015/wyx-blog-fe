import router from './index'
import { RouteLocationRaw } from 'vue-router'
import { triggerMaskAnim } from '../reactive/theMasks'
import handleScroll from '../utils/handleScroll'
export function jumpTo(e: MouseEvent, opts: RouteLocationRaw) {
  const close = triggerMaskAnim({ x: e.clientX, y: e.clientY })

  setTimeout(() => {
    handleScroll(document.documentElement, 0).then((res) => {
      router.push(opts).then(() => close())
    })
  }, 500)
}
