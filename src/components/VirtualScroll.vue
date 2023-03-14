<!--
定高虚拟列表
@file: StaticItemHeightVersion02.vue
@author: pan
-->
<script lang="ts">
export default {
  name: 'StaticItemHeightVersion02',
}
</script>
<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue'
import { ArticleData } from '../types/ArticleData';
import ArticleCard from './ArticleCard.vue';
const props = withDefaults(
  defineProps<{
    /**
     * 每一项的高度
     */
    itemHeight?: number,
    dataSource?: ArticleData[]
  }>(),
  {
    itemHeight: 104,
  }
)

const { itemHeight, dataSource } = toRefs(props)

/**
 * 柱子节点高度: `总数据量*每一项的高度`
 *
 * 用于撑开滚动容器的高度
 */
const pillarDomHeight = computed<number>(() => {
  return itemHeight.value * dataSource.value.length
})
/**
 * 所有数据
 */
// const dataSource = ref<string[]>([])
/**
 * 内容容器的y轴偏移量。当渲染区域第一个元素完全移到了可视区域之外时，需要重新计算startOffset，将第一个元素移动回可视区域
 */
const startOffset = ref<number>(0)
const styleTranslate = computed<string>(() => {
  return `transform:translate(0,${startOffset.value}px)`
})
/**
 * 当前视口第一个数据在dataSource数组的索引位置. 默认:0
 */
const start = ref<number>(0)
/**
 * 当前视口最后一个数据在dataSource数组的索引位置
 */
const end = computed(() => {
  return start.value + pageItemCount.value
})
/**
 * 当前视口需要显示的数据
 */
const renderData = computed<ArticleData[]>(() => {
  // 避免最后一个元素的数组下标超出实际的数组长度
  let realStart = Math.max(0, start.value - pageItemCount.value)

  // 后面也多换从一屏(避免最后一个元素的数组下标超出实际的数组长度)
  const realEnd = Math.min(end.value + pageItemCount.value, dataSource.value.length)
  const res = dataSource.value.slice(realStart, realEnd)
  // console.log(res)

  return res
})
/**
 * 滚动容器. 支持显示滚动条的容器。确定虚拟列表的可视区高度
 */
const scrollerContainerRef = ref<HTMLDivElement>()
/**
 * 滚动容器高度。采用计算属性方式动态获取滚动容器高度
 */
const scrollerContainerRefHeight = computed(() => {
  return scrollerContainerRef.value ? scrollerContainerRef.value.offsetHeight : 0
})
/**
 * 视口可显示的元素数量： 滚动容器高度/每一项的高度，然后对结果进行向上取整，然后再+1
 *
 * 为什么要进行向上取整？
 * 如：页面高度100px，单个元素30px，那么此时100/30等于3，还多了10px，那这10px实际应该显示第4个元素的一小部分，所以需要进行向上取整
 *
 * 为什么最后还要+1？
 * 如：页面高度100px，单个元素30px，根据向上取整的方式，我们已经将这个视口渲染出了4个元素，第4个元素只有10px在视口中，剩余20px在视口之外。
 * 如果此时我们拖动滚动条，拖动25px，此时第一个元素尚未完全移出视口，最后一个元素完全进入了视口，且还有5px空白。按照通常的想法，这里应该显示第5个元素的一小部分才对。
 * 因此，最后还需要+1
 */
const pageItemCount = computed<number>(() => {
  return Math.ceil(scrollerContainerRefHeight.value / itemHeight.value) + 1
})


function onScroll(evt: UIEvent) {
  // 获取触发滚动事件的元素
  const scrollDom = evt.target as HTMLDivElement
  if (!scrollDom) return

  // 获取滚动的距离
  const { scrollTop } = scrollDom
  start.value = Math.floor(scrollTop / itemHeight.value)
  startOffset.value = start.value * itemHeight.value
}
</script>

<template>
  <div class="scrollerContainer" ref="scrollerContainerRef" @scroll="onScroll">
    <div class="pillarDom" :style="{ height: `${pillarDomHeight}px` }"></div>
    <div class="contentList" :style="styleTranslate">
      <div v-for="data in renderData" :key="data._id">
        <ArticleCard :data="data">
        </ArticleCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrollerContainer {
  // height: 100%;
  @include scrollbar();
  width: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.pillarDom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.contentList {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.item {
  height: calc(v-bind(itemHeight) * 1px);
  line-height: calc(v-bind(itemHeight) * 1px);
  border-bottom: 8px solid green;
  width: 100%;
  // 这里同样很重要，盒模型必须为border-box，item元素的高度才不会因为border值而超出设置的高度
  box-sizing: border-box;
  background-color: orange;

  &:last-child {
    border-bottom: none;
  }
}
</style>
