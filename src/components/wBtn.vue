<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String
    },
    onClick: {
      type: Object as () => (e: MouseEvent) => void,
      default: () => {},
      required: true
    }
  },
  setup(props) {
    const { text, onClick } = props
    return () => (
      <div class="wBtn" onClick={(e) => onClick!(e)}>
        <div>{text}</div>
      </div>
    )
  }
})
</script>

<style lang="scss">
.wBtn {
  color: $font-light;
  padding: 0.5rem 1.4rem;
  border-radius: 0.5rem;
  background-color: $bgColor-light;
  border: solid 2px $darkColor;

  &:hover {
    box-shadow: 0.15rem 0.15rem 3px #222121;
    cursor: pointer;
  }
}
</style>
