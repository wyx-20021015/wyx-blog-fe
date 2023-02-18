<script lang="tsx">
import { defineComponent, ref, Ref, watch, toRef } from 'vue'


import { getArticleByOffset } from '../service/article'
import { Tag } from '../types/tag'
import ArticleCard from '../components/ArticleCard.vue'
import { ArticleData } from '../types/ArticleData'
import Tags from '../components/tags.vue'
import router from '../router'
import ShowMessage from '../components/showMessage.vue'
import WBtn from "../components/wBtn.vue"

export default defineComponent({
  props: {
    offset: {
      type: String
    },
    id: {
      type: String
    },
    tag: {
      type: String
    }
  },
  setup(props) {
    let data_: Ref<ArticleData[]> = ref([])

    const { offset, id, tag } = props
    const work = async (offset, tag, id) => {
      let { data: data__ } = await getArticleByOffset(offset, tag, id)
      data_.value = data__
      // console.log(data_.value, 'data_')
    }

    const tag_ = toRef(props, 'tag')
    const offset_ = toRef(props, 'offset')
    const id_ = toRef(props, 'id')

    watch(
      [tag_, offset_, id_],
      ([newTag, newOffset, newId], oldVal) => {
        data_.value = []
        work(newOffset, newTag, newId)
      },
      { immediate: true }
    )
    work(offset, tag, id)

    const prePage = () => {
      let offset__: number = parseInt(offset_.value)
      if (offset__ <= 1) return
      router.replace({
        name: `article`,
        query: {
          tag: tag_.value,
          offset: offset__ - 1
        }
      })
    }

    const nextPage = () => {
      let offset__: number = parseInt(offset_.value)
      router.replace({
        name: `article`,
        query: {
          tag: tag_.value,
          offset: offset__ + 1
        }
      })
    }

    const content = `
      没有更多内容了^^^^^^$$$$$$$
      空空空空空空如也~
    `

    return () => (
      <div class="article">
        <div class="article-list">
          {data_.value !== null &&
            data_.value.map((item) => {
              return <ArticleCard data={item} />
            })}
          {(data_.value?.length === 0 || data_.value === null) && (
            <div class="article-list-none">
              <ShowMessage msg={content} />
            </div>
          )}
        </div>
        <div class="article-page-controller">
          <div class="article-page-controller-btn" >
            <WBtn onClick={() => prePage()} text="上一页" size="middle">上一页</WBtn>
          </div>
          <div class="article-page-controller-btn" onClick={() => nextPage()}>
            <WBtn onClick={() => nextPage()} text="下一页" size='middle'>下一页</WBtn>
          </div>
        </div>
        <Tags />
      </div>
    )
  }
})
</script>

<style lang="scss">
.article {
  height: 100%;
  width: 86vw;
  max-width: 1000px;
  display: flex;
  flex-direction: column;

  &-page-controller {
    color: white;
    // height: 50px;
    // line-height: 50px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }

  &-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 420px;
    margin-bottom: 10px;
  }
}
</style>
