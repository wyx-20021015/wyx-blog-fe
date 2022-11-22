<script lang="tsx">
import { defineComponent, toRefs } from 'vue'
import ShowMessage from "./showMessage.vue"
import { uploadURL } from "../constants/URL"
import * as EXT from "../constants/ext"
import textFileIcon from "../assets/img/textFile.png"
import Token from "../utils/token"
import router from '../router'
const { getToken } = Token

export default defineComponent({
  props: {
    files: {
      type: Array as () => string[],
      required: true
    }
  },

  setup(props) {
    const { files } = toRefs(props)
    const empty_message = `
      该文件夹为空QAQ^^^^^^$$$$$$$$$
      或许我该把它删掉的..
    `
    const goDetail = (t: string, type: "img" | "text") => {
      if (type === "img")
        window.open(`${uploadURL}/${t}?token=${getToken()}`)
      else if (type === "text")
        window.open(`${uploadURL}/${t}?token=${getToken()}`)
    }

    const showFile = (t: string, index: number) => {
      const ext = t.split(".").pop()
      if (EXT.imgExt.includes(ext) === true) {
        return <div class="file-manager-pannel-item" onClick={() => goDetail(t, 'img')}>
          <div class={"file-manager-pannel-item-icon"}>
            <img src={`${uploadURL}/${t}?token=${getToken()}`}></img>
          </div>
          <div key={index} class="file-manager-pannel-item-filename">{t.split("/").pop()}</div>
        </div>
      }
      else if (EXT.textExt.includes(ext) === true) {
        return <div class="file-manager-pannel-item" onClick={() => goDetail(t, 'text')}>
          <div class={"file-manager-pannel-item-icon"}>
            <img src={textFileIcon}></img>
          </div>
          <div key={index} class="file-manager-pannel-item-filename">{t.split("/").pop()}</div>
        </div>
      }
    }
    return () =>
      <div class={'file-manager-pannel-container'}>
        <div class="file-manager-pannel">
          {
            files.value === null || files.value === undefined ?
              <ShowMessage msg={empty_message} /> :
              files.value.map((t, index) =>

                <> {showFile(t, index)}</>

              )
          }
        </div >
      </div >
  }
})
</script>

<style lang="scss">
.file-manager-pannel {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-template-rows: 200px;
  box-sizing: border-box;
  overflow: auto;
  // flex: 1;
  width: 100%;
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

  &-container {
    flex: 1;
    overflow: hidden;
    padding: 20px 0;
  }

  &-item {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-align: center;

    &-filename {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &-icon {
      width: 83%;
      height: 88%;
      margin: 0 auto;
      // display: flex;
      // align-items: center;
      // justify-content: center;

      & img {
        width: 94%;
        height: 94%;
      }
    }

  }
}
</style>    
