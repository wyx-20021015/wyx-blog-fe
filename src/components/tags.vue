<script lang="tsx">
import { defineComponent, ref, Ref, watch } from 'vue'
import { Tag } from '../types/tag'
import TagItem from './tag-item.vue'
import store from '../store'
export default defineComponent({
  props: {
    tagStyle: String,
    currTags: Object as () => Ref<Tag[]>,
    isInputTag: Boolean,
    routerTag: Boolean
  },
  setup(props) {
    let data = ref<Tag[]>(store.getters.getTags)
    const fetchTags = async () => {
      await store.dispatch('getTags')
      data.value = store.getters.getTags
    }
    if (!data.value || data.value.length === 0) { fetchTags() }
    let { tagStyle, currTags, isInputTag, routerTag = false } = props
    isInputTag = isInputTag === undefined ? false : isInputTag
    // console.log(isInputTag)
    const isInputing = ref(false)
    const inputLength = ref(' ')
    const newTag = () => {
      isInputing.value = true
    }

    const a = ref<Tag>({ name: '+tag' })
    const getCurrLength = () => {
      let len = 0
      for (let i = 0; i < inputLength.value.length; i++) {
        let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
        if (reg.test(inputLength.value[i])) len += 1
        else {
          len += 0.55
        }
      }
      return len
    }
    const submit = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        isInputing.value = false
        for (let i = 0; i < data.value.length; i++) {
          if (data.value[i].name === (e.target as HTMLInputElement).value)
            return
        }
        let obj: Tag = {
          name: (e.target as HTMLInputElement).value
        }
        data.value.push(obj)
      }
    }
    return () => (
      <div class="tags-list" style={tagStyle}>
        {data.value?.map((t) => (
          <TagItem data={t} currTags={currTags} routerTag={routerTag} />
        ))}
        {isInputTag &&
          (!isInputing.value ? (
            <TagItem
              data={a.value}
              currTags={currTags}
              onClick={() => newTag()}
              inputTag={true}
            />
          ) : (
            <input
              class="tags-list-input"
              style={{ width: getCurrLength() + 'rem' }}
              v-model={inputLength.value}
              onKeydown={submit}
            />
          ))}
      </div>
    )
  }
})
</script>

<style lang="scss">
.tags-list {
  display: flex;
  position: absolute;
  top: 20px;
  gap: 10px;
  left: 30px;
  width: 30vw;
  flex-wrap: wrap;
  // max-width: 260px;
  overflow-y: auto;
  align-content: flex-start;
  overflow: auto;
  height: 180px;

  @media screen and (max-width: 900px) {
    height: 130px;
    font-size: 9px;
    width: 20vw;
    gap: 3px;

  }

  @include scrollbar();

  &-input {
    height: 1.5rem;
    // flex: 1;
    max-width: 30vw;
    padding: 0.2rem 10px;
    outline: 0;
    border: 0;
    background-color: $bgColor-light;
    font-size: 1rem;
    line-height: 1rem;
    border-radius: 0.3rem;
    min-width: 1rem;
    display: inline-block;
  }
}
</style>
