import { createApp } from 'vue'
import { createStore } from 'vuex'
import { Tag } from '../types/tag'
import { getAllTags } from '../service/tag'
// 创建一个新的 store 实例
type stateType = {
  tags: Array<Tag>
}
const store = createStore<stateType>({
  state() {
    let tags: Array<Tag> = []
    return {
      tags
    }
  },
  getters: {
    getTags(state) {
      // console.log(state, 'in getter')
      return state.tags
    }
  },
  mutations: {
    setTags(state: stateType, payload: Array<Tag>) {
      state.tags = payload
    }
  },
  actions: {
    async getTags(context) {
      const payload = await getAllTags()
      context.commit('setTags', payload)
    }
  }
})

export default store
