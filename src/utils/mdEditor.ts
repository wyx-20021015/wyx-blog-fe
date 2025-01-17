import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

// highlightjs
import hljs from 'highlight.js'
// 按需引入语言包
import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('json', json)
VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
  extend(md) {}
})
VueMarkdownEditor.use(createTodoListPlugin())
VueMarkdownEditor.use(createHighlightLinesPlugin())
export { VueMarkdownEditor }
