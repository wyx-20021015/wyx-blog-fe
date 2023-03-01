<script lang="tsx">
import { defineComponent, ref, Ref } from 'vue'
import { Tag } from '../types/tag'
import { jumpTo } from '../router'
export default defineComponent({
  props: {
    data: { type: Object as () => Tag, required: true },
    currTags: Object as () => Ref<Tag[]>,
    inputTag: Boolean,
    routerTag: Boolean
  },
  setup(props) {
    const { data, currTags, inputTag, routerTag = false } = props
    const hasTag = (tag: Tag) => {
      if (
        currTags === undefined ||
        tag === undefined ||
        currTags.value === undefined
      )
        return -1
      for (let i = 0; i < currTags.value.length; i++) {
        if (currTags.value[i].name === tag.name) return i
      }
      return -1
    }
    const searchTag = (e: MouseEvent) => {
      if (inputTag === true) return
      let res: number
      if (currTags != undefined) {
        res = hasTag(data)
        if (res != -1) {
          if (routerTag) currTags.value = []
          else
            currTags.value.splice(res, 1)

        } else {
          if (routerTag) currTags.value = [data]
          else
            currTags.value.push(data)
        }
      }
      if (routerTag === true) {
        if (res !== -1)
          jumpTo(e, {
            name: `article`,
            query: {
              offset: 1
            }
          })
        else
          jumpTo(e, {
            name: `article`,
            query: {
              tag: (data as any).name,
              offset: 1
            }
          })
      }
    }
    return () => (
      <div
        class={hasTag(data as any) != -1 ? 'tag-item-active' : ''}
        onClick={searchTag}
      >
        <div class="tag-item">
          <div class="tag-item-name">{(data as any).name}</div>
          <div class="tag-item-count">{(data as any).count}</div>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss">
.tag-item-active {
  background-color: $bgColor-light;
  border-radius: 20px;
}

.tag-item {
  display: flex;
  gap: 5px;
  padding: 6px 8px;
  border-radius: 20px;
  border: 2px solid $tag-border;
  color: $tag-font;
  cursor: pointer;
}
</style>
