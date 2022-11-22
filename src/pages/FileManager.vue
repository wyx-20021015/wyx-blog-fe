<script lang="tsx">
import { defineComponent, ref, watchEffect } from "vue";
import { getField, getFiles } from "../service";
import Dir from "../components/Dir.vue"
import FilePannel from "../components/FilePannel.vue";
export default defineComponent({
  setup(props) {
    const field = ref<string[]>([])
    const files = ref<string[]>([])
    const currField = ref<string>("img")
    const fetchField = async () => {
      const res = await getField()
      field.value = res
    }
    const fetchFiles = async () => {
      const res = await getFiles(currField.value)
      files.value = res
    }
    watchEffect(async () => {
      const res = await getFiles(currField.value)
      files.value = res
    })
    fetchField()
    // fetchFiles()
    const onChangeCurrField = (arg) => {
      currField.value = arg
    }
    return () => (

      <div class={"file-manager"}>
        <Dir
          field={field.value}
          currField={currField.value}
          files={files.value}
          onChangeCurrField={onChangeCurrField} />

        <FilePannel files={files.value} />

      </div>

    );
  },
});
</script>

<style lang="scss" scoped>
.file-manager {
  display: flex;
  width: 98vw;
  background-color: rgba(255, 249, 249, 0.237);
  max-height: 100%;
  height: 100%;

}
</style>
