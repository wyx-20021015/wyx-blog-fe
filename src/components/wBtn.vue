<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String
    },
    onClick: {
      type: (Function as unknown) as () => (e: MouseEvent) => void,
      default: () => { },
      required: true
    },
    size: {
      type: String as () => ("small" | "large" | 'middle')
    }
  },
  setup(props) {
    const { text, onClick: onClickFun, size = 'large' } = props
    return () => (
      <div class={`wBtn wBtn-${size}`} onClick={(e) => onClickFun!(e)}>
        <div>{text}</div>
        <div class="wBtn-decoration wBtn-decoration-a"></div>
        <div class="wBtn-decoration wBtn-decoration-b"></div>
        <div class="wBtn-decoration wBtn-decoration-c"></div>
      </div>
    )
  }
})
</script>

<style lang="scss">
.wBtn {
  color: $font-light;
  border-radius: 0.5rem;
  background-color: $bgColor-light;
  border: solid 2px $darkColor;
  cursor: pointer;
  position: relative;

  &-decoration {
    position: absolute;
    background-color: transparent;
    border: 1px solid $decorate;
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }

  &-small {
    padding: 2px;
    font-size: .8rem;
    display: inline-block;
  }

  &-large {
    padding: 0.5rem 1.4rem;
  }

  &-middle {
    padding: 5px 10px;
    display: inline-block;
  }


  &:hover {
    box-shadow: 0.15rem 0.15rem 3px #222121;
    cursor: pointer;
  }
}
</style>
