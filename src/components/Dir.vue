<script lang="tsx">
import { defineComponent, ref, Ref, toRefs } from "vue";

export default defineComponent({
  emits: ['changeCurrField'],
  props: {
    field: {
      type: Array,
      required: true
    },
    files: {
      type: Array,
      required: true
    },
    currField: {
      type: String,
      required: true
    },
  },
  setup(props, { emit }) {
    const { field, files, currField } = toRefs(props)
    return () =>
      <div class={"file-manager-dir-container"}>
        <div class={"file-manager-dir"}>
          {
            field.value.map((t: any, index: any) => <div class={"file-manager-dir-item"} key={index} onClick={() => {
              emit('changeCurrField', t)
            }}>{t}</div>)
          }
        </div>
      </div>




  },
});
</script>

<style lang="scss" scoped>
.file-manager-dir {
  display: flex;
  border-radius: 50px;
  border: 2px solid $strong;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 220px;
  box-sizing: border-box;
  margin: 20px auto;
  padding: 20px 0;


  &-container {
    width: 250px;
    overflow: auto;
    height: 100%;

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
      scrollbar-arrow-color: red;

    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
      scrollbar-arrow-color: red;
    }

    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }

  &-item {
    color: $lightlightColor;
    padding: 10px 30px;
    border-radius: 30px;
    box-sizing: border-box;
    border: solid 1px $lightlightColor;
    cursor: pointer;
  }
}
</style>

