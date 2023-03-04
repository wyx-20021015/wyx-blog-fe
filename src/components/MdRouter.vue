<!-- markdown 的router -->
<script lang="tsx">
import { defineComponent, ref, onMounted, Ref, nextTick } from 'vue'
import handleScroll from "../utils/handleScroll"
type anchor = {
  title: string
  lineIndex: string
  indent: number
}
export default defineComponent({
  name: 'MdRouter',
  setup(props) {
    let MdViewer: HTMLElement
    const titles = ref<anchor[]>([])
    const handleClick = (anchor) => {
      const { lineIndex } = anchor

      const heading = MdViewer.querySelector(`[data-v-md-line="${lineIndex}"]`) as HTMLElement
      console.log(heading)
      const top = heading.offsetTop
      handleScroll(document.documentElement, top)
    }
    onMounted(() => {
      setTimeout(() => {
        MdViewer = document.querySelector(".v-md-editor")
        const anchors = MdViewer.querySelectorAll("h1,h2,h3,h4,h5,h6")
        const titles_ = Array.from(anchors).filter((title) => (title as HTMLElement).innerText.trim())
        if (!titles_.length) return
        const hTags = Array.from(new Set(titles_.map(t => t.tagName))).sort()
        titles.value = Array.from(anchors).map((el) => ({
          title: (el as HTMLElement).innerText,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName),
        }));
        console.log(titles.value)
      }, 200)

    })
    return () =>
      <div class="v-md-router">
        {titles.value.map(anchor =>
          <div class="v-md-router-item" style={{ padding: `5px 0 10px ${anchor.indent * 20}px` }} onClick={() => handleClick(anchor)}>
            <a style="cursor: pointer">{anchor.title}</a>
          </div>)}
      </div >

  }
})
</script>

<style lang="scss">
.v-md-router {
  width: 12vw;
  font-size: 12px;
  overflow: hidden;
  font-size: 10px;
  box-sizing: border-box;

  &-item {
    border-bottom: 1px solid $lightColor;
  }

  @media screen and (max-width: 800px) {}
}
</style>
