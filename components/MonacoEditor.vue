<template>
  <section id="monacoEditorDiff" class="monaco-editor-box"></section>
</template>

<script setup lang="ts">
 import { onMounted, onBeforeUnmount } from "vue";
const editorOptions = {
  value: '', // 编辑器初始显示文字
  autoIndex: false, // 控制是否开启自动索引。当开启时，编辑器会自动创建索引以加速搜索和语义高亮。
  fontSize: 16, // 字体大小
  language: 'plaintext', //语言
  readOnly: true, // 是否只读  只影响右侧
  overviewRulerBorder: false, // 滚动是否有边框
  cursorSmoothCaretAnimation: false, // 控制光标平滑动画的开启与关闭。当开启时，光标移动会有平滑的动画效果。
  mouseWheelZoom: false, //设置是否开启鼠标滚轮缩放功能
  folding: false, //控制是否开启代码折叠功能
  automaticLayout: true, // 控制编辑器是否自动调整布局以适应容器大小的变化
  minimap: {
    // 关闭代码缩略图
    enabled: false, // 是否启用预览图
  },
  scrollbar: {
    verticalScrollbarSize: 5, // 垂直滚动条宽度，默认px
    horizontalScrollbarSize: 2, // 水平滚动条高度
  },
  wordWrap: 'on', // 开启自动换行
  roundedSelection: true, // 右侧不显示编辑器预览框
  originalEditable: true, // 是否允许修改原始文本
  scrollBeyondLastLine: false, // 启用该功能，滚动可以在最后一行之后增加一个屏幕大小，默认值为 true
  renderLineHighlight: 'none', // 启用当前行高亮显示的呈现
  contextmenu: false, // 双击菜单
  columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
  copyWithSyntaxHighlighting: false, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
  links: false, // 是否点击链接
  selectionHighlight: true,
  lineNumbers: false, //显示行号
  autoClosingBrackets: 'never', // 禁用自动闭合括号功能
  renderIndentGuides: false, // 缩进线的呈现
  suggestOnTriggerCharacters: false, // 用于控制是否在输入触发字符时显示建议
  glyphMargin: false, // 设置是否显示装饰符号边距
  unicodeHighlight: {
    ambiguousCharacters: false, // 禁用 unicode 字符的高亮显示
  },
  stickyScroll: {
    enabled: false, // 取消顶部吸附
  },
}; 

const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      theme: 'vs',
    }),
  },
  oldValue: {
    type: String,
  },
  newValue: {
    type: String,
  },
});

let editor: any;
let originalModel: any;
let modifiedModel: any;
let editorWorker: any;
let monaco: any;
let modifiedEditor: any;
let originalEditor: any;

const emits = defineEmits(['originalChange']);

const init = () => {
  editor = monaco.editor.createDiffEditor(document.getElementById('monacoEditorDiff'), {
    ...editorOptions,
    ...props.options,
  });

  //创建左右编辑器
  originalModel = monaco.editor.createModel(props.oldValue, 'plaintext');
  modifiedModel = monaco.editor.createModel(props.newValue, 'plaintext');
  editor.setModel({
    original: originalModel,
    //modified: modifiedModel,
  });

  originalEditor = editor.getOriginalEditor();
  modifiedEditor = editor.getModifiedEditor();

  // 原始模型的内容发生变化时触发的操作
  originalModel.onDidChangeContent(() => {
    const OriginalText = originalModel.getValue();
    emits('originalChange', OriginalText);
  });

  modifiedModel.onDidChangeContent(() => {});

  originalEditor.onDidBlurEditorText(() => {});
};

const asyncFn = async () => {
  monaco = await import('monaco-editor');
  editorWorker = await import('monaco-editor/esm/vs/editor/editor.worker?worker');

  //解决 Monaco Editor 无法正确加载其所需的 Web Worker
  self.MonacoEnvironment = {
    getWorker(workerId, label) {
      return new editorWorker();
    },
  };

  //初始化编辑器
  init();
};

onMounted(() => {
  asyncFn();
});

onBeforeUnmount(() => {
  editor && editor.dispose();
});
</script>
 