<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import myAvator from '../assets/img/myAvator.png'
import { navigateTo } from '../router/index'
import WBtn from "../components/wBtn.vue"
export default defineComponent({
  setup(props, { slots }) {
    const router = useRouter()
    let overflow = router.currentRoute.value.meta.overflow
    setTimeout(() => {
      // console.log('layout', router.currentRoute.value)
    }, 1000)

    return () => (
      <>
        <div class={router.currentRoute.value.meta.overflow ? 'container_' : 'container'}>
          <div class="header">
            <div class="myInfo">
              <div class="myAvatar-wrap">
                <div class="myAvatar">
                  <img src={myAvator} alt="我的头像" />
                  <div class="myAvatar-decoration-wrap">
                    <div class="myAvatar-decoration"></div>
                  </div>
                </div>

              </div>
              <div class="navBar">
                <WBtn onClick={() => navigateTo('/article?offset=1')} text="文章" size="small"></WBtn>
                <WBtn onClick={() => { window.open('http://resume.wangyixuan2002.cn/') }} text="简历" size="small"></WBtn>
                <WBtn onClick={() => navigateTo('/admin')} text="管理" size="small"></WBtn>
                <WBtn onClick={() => navigateTo('/file')} text="网盘" size="small"></WBtn>
              </div>
            </div>
          </div>
          <div class="router-view">{slots.default && slots.default()}</div>
        </div>
      </>
    )
  }
})
</script>

<style lang="scss" scoped>
.router-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.container_ {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  gap: 10px;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  gap: 10px;
  align-items: center;
}


.header {
  text-align: center;
}

.header span {
  margin: 0 10px;
  text-decoration: none;
}

.header span:hover {
  color: #948c76;
  text-decoration: none;
  cursor: pointer;
}

.navBar {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.myAvatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 160px;

  &-wrap {
    width: 180px;
    height: 180px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 20px auto;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &-decoration {
    position: absolute;
    inset: 0 0 0 0;
    animation: rotate 5s linear infinite;
    border-radius: 999px;
    border: 1px solid transparent;
    border-bottom: 1px solid $decorate;
    border-top: 1px solid $decorate;

    &-wrap {
      position: absolute;
      inset: 0 0 0 0;
      animation: get-in 2s forwards;
    }
  }

  &::before,
  &::after {
    content: "";
    border: 1px solid transparent;
    border-radius: 999px;
    position: absolute;
    animation: rotate infinite linear;
  }

  &::before {
    border-top: 1px solid $lightlightColor;
    top: -10px;
    bottom: -10px;
    right: -10px;
    left: -10px;
    animation-duration: 10s;
    animation-delay: -2s;
  }

  &::after {
    border-top: 1px solid $lightColor;
    top: -20px;
    bottom: -20px;
    right: -20px;
    left: -20px;
    animation-duration: 7s;
    animation-delay: -5s;
  }


  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes get-in {
    0% {
      transform: scale(50%);
      opacity: 0;
    }

    40% {
      transform: scale(70%);
      opacity: 1;
    }

    70% {
      transform: scale(70%);
    }

    70% {
      transform: scale(100%);
    }
  }
}
</style>
