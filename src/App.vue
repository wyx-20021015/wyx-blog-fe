<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Layout from './layout/layout.vue'
import router from './router'
import Admin from './layout/admin.vue'
import None from './layout/none.vue'
import store from './store'
import TheMask from "./components/TheMask.vue"

export default defineComponent({
  setup(props) {
    store.dispatch('getTags')
    console.log("App render")
    return () => (
      <>
        {router.currentRoute.value.meta.admin ? (
          <Admin v-slots={{ default: () => <RouterView /> }} />
        ) : router.currentRoute.value.meta.none ? (
          <None v-slots={{ default: () => <RouterView /> }} />
        ) : (
          <Layout v-slots={{ default: () => <RouterView /> }} />
        )}
        <TheMask></TheMask>
      </>
    )
  }
})
</script>

<style lang="scss"></style>
