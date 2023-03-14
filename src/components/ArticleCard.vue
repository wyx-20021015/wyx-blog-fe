<script lang="tsx">
import { defineComponent, toRefs } from 'vue'
import { ArticleData } from '../types/ArticleData'
import { jumpTo } from '../router'
export default defineComponent({
  name: 'ArticleCard',
  props: {
    data: { type: Object as () => ArticleData, required: true }
  },
  setup(props) {
    const { data } = toRefs(props)
    const gotoArticleDetail = (e: MouseEvent) => {
      jumpTo(e, {
        name: 'article-detail',
        params: {
          id: data.value._id
        }
      })
    }
    return () => (
      <>
        <div class="articledetail" onClick={(e) => gotoArticleDetail(e)}>
          <div class="articledetail-title">{data.value.title}</div>
          <div class="articledetail-digest">{data.value.digest}</div>
          <div class="articledetail-tags">
            {data.value.tags.map((item) => (
              <div class="articledetail-tags-tag">{item.name}</div>
            ))}
            <div class="articledetail-visited">👀{data.value.visited}</div>
          </div>
        </div>
      </>
    )
  }
})
</script>

<style lang="scss">
.articledetail {
  height: 100px;
  position: relative;
  background-color: $bgColor-light;
  border-radius: 0.8rem;
  padding: 0.8rem;
  margin: 2px 0;
  box-sizing: border-box;

  &:hover {
    filter: brightness(1.4);
  }

  &-tags {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: absolute;
    right: 2rem;
    bottom: 1rem;

    &-tag {
      color: $font-light;
      border-radius: 0.7rem;
      border: 3px solid $font-light;
      padding: 0.3rem;
    }
  }

  &-title {
    font-size: 1.6rem;
    font-weight: 530;
    cursor: auto;
  }

  &-digest {
    color: $font-gray;
    cursor: auto;
  }
}
</style>
