// 更友好，平缓的的处理scrollTop
const handleScroll = (container: HTMLElement, target: number) => {
  return new Promise((res, rej) => {
    const scrolling = () => {
      const currentTop = container.scrollTop
      if (
        target === currentTop ||
        target === currentTop + 1 ||
        target === currentTop - 1
      ) {
        res(1)
      } else {
        setTimeout(() => {
          container.scrollTop = Math.floor(target + (currentTop - target) * 0.5)
          scrolling()
        }, 50)
      }
    }
    scrolling()
  })
}

export default handleScroll
