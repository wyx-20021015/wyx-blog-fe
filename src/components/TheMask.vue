<script lang="tsx">
import { defineComponent, ref } from "vue";
import { curMaskState, masks } from "../reactive/theMasks";

export default defineComponent({
  name: "CMask",
  setup(props) {
    return () => (
      <div class={`t-mask ${curMaskState.value}`}>
        {masks.map((m) => (
          <div
            class="t-mask_block"
            style={{
              top: m.y + "px",
              left: m.x + "px",
              transform: `translate(-50%, -50%) rotate(${m.angle}deg) scale(${curMaskState.value === "together" ? 0 : 1
                })`,
            }}
          ></div>
        ))}
      </div>
    );
  },
});
</script>

<style lang="scss">
.t-mask {
  &_block {
    position: fixed;
    width: 19vmin;
    height: 19vmin;
    background-color: $maskBgc;
    border: 1px solid $maskBorder;

    z-index: 80;
  }

  &.together {
    .t-mask_block {
      transition: all 0.8s ease;
    }
  }

  &.spreading,
  &.up {
    .t-mask_block {
      transition: all 0.8s ease;
    }
  }

  &.none {
    display: none;
  }
}
</style>
