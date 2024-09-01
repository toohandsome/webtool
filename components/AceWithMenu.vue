<script lang="ts">
import { watch, ref, onMounted, defineComponent } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup
} from "v-contextmenu";

import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import StatusBar from "ace-builds/src-noconflict/ext-statusbar";
import "ace-builds/src-noconflict/ext-static_highlight";
import "ace-builds/src-noconflict/ext-settings_menu";
 
import { CaretRight,CaretBottom } from '@element-plus/icons-vue';

export default defineComponent({
  name: "AceWithMenu",

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup,
    [VAceEditor.name]: VAceEditor
  },

  directives: {
    contextmenu: directive
  },
  setup() {
    const dialogTitle = ref("");
    const myAceEditorRef = ref(null);
    const dialogVisible = ref(false);
    const searchDialogVisible = ref(false);
    const searchDialogModal = ref(false);
    const dialogValue1 = ref("");
    const dialogValue2 = ref("");
    const searchVal = ref("");
    const searchDialogOpacity = ref(0.9);
    const replaceVal = ref("");
    const searchCheckList = ref(["circle"]);
    const filterCheckList = ref(["case"]);
    // const searchMode = ref("normal");
    // const searchDirection = ref("down");
    const filterDialogVisible = ref(false);
    const editerTxt = ref(`console.log('Hello, Ace Editor!');
1
2
3
4
5
e
e
E
E
ee
EE
XEX13
6
7
8
9
10
xasx
searchDialogModald
sxaspxe
dashedw
dasdiew
ded4
    
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background-color: rgb(90 167 164 / 20%);
  border: 3px dashed rgb(90 167 164 / 90%);
  border-radius: 8px;
}
    `);
    const language = ref("javascript");
    const theme = ref("github");
    const aceEditor = ref(null);
    const editorOptions = ref({
      fontSize: "12px",
      showPrintMargin: false
    });
    const filterStr = e => {
      // console.log(e);
      // showSettingBox(filterStrFun1);
      filterDialogVisible.value = true;
    };
    const filterStrFun1 = () => {
      filterTextarea(filterStrFun2, dialogValue1.value);
    };
    const filterStrFun2 = (str1, str2) => {
      return str1.indexOf(str2) != -1;
    };
    const filterTextarea = (fun, waitFilterStr) => {
      let editerStr = editerTxt.value;
      const start = performance.now();
      // console.log("editerTxt.value", editerStr);
      var strArr = editerStr.split("\n");
      let finalStr = "";
      let findNum = 0;
      for (let index = 0; index < strArr.length; index++) {
        const element = strArr[index];
        // console.log("element", element);
        if (fun(element, waitFilterStr)) {
          finalStr += element + "\n";
          findNum++;
        }
      }
      if (findNum > 0) {
        ElMessage({
          showClose: true,
          duration: 5000,
          type: "success",
          message: `找到包含 ${dialogValue1.value} 的行: ${findNum}`
        });
        editerTxt.value = finalStr;
      } else {
        ElMessage({
          type: "error",
          message: `未找到包含: ${dialogValue1.value} 的行,不进行处理`
        });
      }
      const end = performance.now();
      const duration = end - start;

      console.log(`执行 耗时 ${duration.toFixed(2)} 毫秒`);
    };
    const searchNext = searchDirection => {
      console.log("11", searchVal.value);
      renewSearchOption();
      if (searchDirection == "down") {
        aceEditor.value.findNext();
      } else if (searchDirection == "up") {
        aceEditor.value.findPrevious();
      }
      // const session = aceEditor.value.getSession();
      // console.log("session", session);
    };
    const searchDialogFocus = type => {
      // console.log("searchDialogFocus");
      if ("open" == type) {
        // console.log("searchDialogFocus open");
        searchDialogOpacity.value = 1;
      } else if ("close" == type) {
        // console.log("searchDialogFocus close");
        searchDialogOpacity.value = 0.6;
      }
    };
    const searchCount = () => {
      console.log("searchCount", searchVal.value);
      // let searchOption = {
      //   backwards: false,
      //   wrap: false,
      //   caseSensitive: false,
      //   wholeWord: false,
      //   regExp: false
      // };
      // const session = aceEditor.value.getSession();
      // const lines = session.getDocument().getAllLines();
      // let matchCount = 0;

      // lines.forEach((line, rowIndex) => {
      //   let col = line.indexOf(searchVal.value);
      //   while (col !== -1) {
      //     matchCount++;
      //     col = line.indexOf(searchVal.value, col + 1);
      //   }
      // });
      // console.log("resultCount: ", matchCount);
      aceEditor.value.session.highlight(searchVal.value);
      aceEditor.value.renderer.updateBackMarkers();
    };

    const showSettingBox = fun => {
      ElMessageBox.prompt("请输入", "请输入", {
        draggable: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
        // inputPattern:
        //   /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "Invalid Email"
      })
        .then(({ value }) => {
          dialogValue1.value = value;
          fun();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消输入"
          });
        });
    };
    if (process.browser) {
    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        searchDialogVisible.value = true;
        console.log("111");
      }
    });
    }
    const renewSearchOption = () => {
      let searchOption = {
        // backwards: false,
        wrap: false,
        caseSensitive: false,
        wholeWord: false,
        regExp: false
      };
      if (searchCheckList.value.includes("whole")) {
        searchOption.wholeWord = true;
      } else {
        searchOption.wholeWord = false;
      }
      if (searchCheckList.value.includes("case")) {
        searchOption.caseSensitive = true;
      } else {
        searchOption.caseSensitive = false;
      }
      if (searchCheckList.value.includes("circle")) {
        searchOption.wrap = true;
      } else {
        searchOption.wrap = false;
      }
      if (searchCheckList.value.includes("reg")) {
        searchOption.regExp = true;
      } else {
        searchOption.regExp = false;
      }
      // if (searchDirection.value == "down") {
      //   searchOption.backwards = false;
      // } else if (searchDirection.value == "up") {
      //   searchOption.backwards = true;
      // }
      // if (searchMode.value == "normal") {
      //   searchOption.regExp = false;
      // } else if (searchMode.value == "reg") {
      //   searchOption.regExp = true;
      // }
      return searchOption;
    };
    const searchOptionChange = () => {
      let searchOption = renewSearchOption();
      aceEditor.value.find(searchVal.value, searchOption);
    };
    const replaceText = type => {
      let searchOption = renewSearchOption();
      aceEditor.value.find(searchVal.value, searchOption);
      if (type == "all") {
        aceEditor.value.replaceAll(replaceVal.value);
      } else {
        aceEditor.value.replace(replaceVal.value);
      }
    };
    const replaceVisable = ref(false);
    const showReplace = () => {
      replaceVisable.value = !replaceVisable.value;
    };

    watch(searchVal, (New, Old) => {
      let searchOption = renewSearchOption();
      aceEditor.value.find(searchVal.value, searchOption);
    });
    onMounted(() => {
      console.log("ace", ace);
      aceEditor.value = myAceEditorRef.value._editor;
      console.log("editor1", myAceEditorRef.value._editor);

      aceEditor.value.commands.addCommand({
        name: "showSearch",
        bindKey: { win: "Ctrl-F" },
        exec: function (editor) {
          event.preventDefault();
          searchDialogVisible.value = true;
        }
      });
      aceEditor.value.focus();
    });
    return {
      dialogTitle,
      dialogVisible,
      dialogValue1,
      dialogValue2,
      filterStr,
      showSettingBox,
      filterStrFun1,
      filterStrFun2,
      filterTextarea,
      searchDialogVisible,
      searchDialogModal,
      searchVal,
      replaceVal,
      searchCheckList,
      editerTxt,
      language,
      theme,
      editorOptions,
      myAceEditorRef,
      aceEditor,
      searchNext,
      searchCount,
      searchDialogOpacity,
      searchDialogFocus,
      renewSearchOption,
      searchOptionChange,
      replaceText,
      CaretRight,
      CaretBottom,
      showReplace,
      replaceVisable,
      filterDialogVisible,
      filterCheckList
    };
  }
});
</script>

<template>
  <div>
    <VAceEditor
      ref="myAceEditorRef"
      v-model:value="editerTxt"
      v-contextmenu:contextmenu
      useWorker="true"
      :lang="language"
      :theme="theme"
      :options="editorOptions"
      style="width: 100%; height: 500px"
    />
    <div id="statusBar" style="width: 100%; height: 100px" />
  </div>

  <div>
    <el-dialog
      v-model="searchDialogVisible"
      :modal="searchDialogModal"
      :close-on-click-modal="false"
      modal-class="my-dialog-class"
      width="700"
      draggable
      overflow
      :style="{ opacity: searchDialogOpacity }"
      @focusin="searchDialogFocus('open')"
      @focusout="searchDialogFocus('close')"
      style="pointer-events: auto;"
    >
      <div style="display: flex">
        <!-- <Edit style="width: 1em; height: 1em; margin-right: 8px" /> -->
        <!-- <IconifyIconOffline :icon="CaretRight" /> -->
        <el-icon    style="margin-right: 5px; margin-top: 8px" @click="showReplace" >
          <CaretBottom v-if="replaceVisable"/>
          <CaretRight v-if="!replaceVisable"/>
        </el-icon>
        <el-text>查找目标：</el-text
        ><el-input
          v-model="searchVal"
          style="width: 350px"
          clearable
          autofocus
        />
        <!-- <el-button style="margin-left: 10px" @click="searchCount"
          >计数</el-button
        > -->
        <el-button style="margin-left: 10px" @click="searchNext('up')"
          >上一个</el-button
        >
        <el-button @click="searchNext('down')">下一个</el-button>
      </div>
      <div
        v-show="replaceVisable"
        style="margin-top: 10px; margin-bottom: 10px; margin-left: 18px"
      >
        <el-text>替换内容：</el-text
        ><el-input v-model="replaceVal" style="width: 350px" clearable />
        <el-button style="margin-left: 10px" @click="replaceText"
          >替换</el-button
        >
        <el-button @click="replaceText('all')">全部替换</el-button>
      </div>
      <div style="margin-top: 10px; margin-bottom: 5px">
        <el-checkbox-group
          v-model="searchCheckList"
          @change="searchOptionChange"
        >
          <el-checkbox label="循环查找" value="circle" />
          <el-checkbox label="全词匹配" value="whole" />
          <el-checkbox label="匹配大小写" value="case" />

          <el-checkbox label="正则" value="reg" />
        </el-checkbox-group>
      </div>
      <div>
        <!-- <div>
          <el-text style="margin-right: 38px">方向: </el-text>
          <el-radio-group
            v-model="searchDirection"
            @change="searchOptionChange"
          >
            <el-radio border label="向下" value="down" />
            <el-radio border label="向上" value="up" />
          </el-radio-group>
        </div> -->
        <!-- <div style="margin-top: 10px; margin-bottom: 10px">
          <el-text style="margin-right: 10px">查找模式: </el-text>
          <el-radio-group v-model="searchMode" @change="searchOptionChange">
            <el-radio border label="普通" value="normal" />
            <el-radio border label="正则" value="reg" />
            <el-radio border disabled label="匹配多行" value="mutiline" />
          </el-radio-group>
        </div> -->
      </div>
    </el-dialog>

    <!-- 右键菜单过滤弹窗-->
    <el-dialog
      v-model="filterDialogVisible"
      :modal="searchDialogModal"
      :close-on-click-modal="false"
      modal-class="my-dialog-class"
      width="500"
      draggable
      overflow
      :style="{ opacity: searchDialogOpacity }"
      title="筛选/过滤条件"
      @focusin="searchDialogFocus('open')"
      @focusout="searchDialogFocus('close')"
       style="pointer-events: auto;"
    >
      <div style="display: flex">
        <el-text>内容 ：</el-text
        ><el-input
          v-model="dialogValue1"
          style="width: 350px"
          clearable
          autofocus
        />
      </div>

      <div style="margin-top: 10px; margin-bottom: 5px">
        <el-checkbox-group
          v-model="filterCheckList"
          @change="searchOptionChange"
        >
          <el-checkbox label="匹配大小写" value="case" />
          <el-checkbox label="正则" value="reg" />
          <el-checkbox label="选中行" value="selectd" />
          <el-checkbox disabled label="新编辑器" value="newEditor" />
        </el-checkbox-group>
      </div>
      <div />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="filterDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="filterDialogVisible = false"
            >预览</el-button
          >

          <el-button type="danger" @click="filterStrFun1"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-submenu title="筛选/过滤">
        <v-contextmenu-item @click="filterStr"
          >包含特定文本的行</v-contextmenu-item
        >
        <!-- <v-contextmenu-item
          >筛选包含特定文本的行到一个新的编辑器</v-contextmenu-item
        > -->
        <!-- <v-contextmenu-divider /> -->
        <!-- <v-contextmenu-item>筛选/过滤 正则匹配的行</v-contextmenu-item> -->
        <!-- <v-contextmenu-item
          >筛选正则匹配的行到一个新的编辑器</v-contextmenu-item
        > -->
        <v-contextmenu-divider />
        <v-contextmenu-item>在选中行中 包含特定文本的行</v-contextmenu-item>
        <!-- <v-contextmenu-item
          >在选中文件中筛选包含特定文本的行到一个新的编辑器</v-contextmenu-item
        > -->
        <v-contextmenu-divider />
        <v-contextmenu-item>不包含特定文本的行</v-contextmenu-item>
        <!-- <v-contextmenu-item
          >筛选不包含特定文本的行到一个新的编辑器</v-contextmenu-item
        > -->
        <!-- <v-contextmenu-divider />
        <v-contextmenu-item>筛选/过滤 正则不匹配的行</v-contextmenu-item> -->
        <!-- <v-contextmenu-item
          >筛选正则不匹配的行到一个新的编辑器</v-contextmenu-item
        > -->
        <v-contextmenu-divider />
        <v-contextmenu-item>在选中行中不包含特定文本的行</v-contextmenu-item>
        <!-- <v-contextmenu-item
          >在选中文件中筛选不包含特定文本的行到一个新的编辑器</v-contextmenu-item
        > -->
      </v-contextmenu-submenu>
      <v-contextmenu-submenu title="前后缀">
        <v-contextmenu-item>给所有行添加前缀</v-contextmenu-item>
        <v-contextmenu-item>给所有行添加后缀</v-contextmenu-item
        ><v-contextmenu-item>给所有行添加相同前后缀</v-contextmenu-item>
        <v-contextmenu-divider />
        <v-contextmenu-item>给选中行添加前缀</v-contextmenu-item>
        <v-contextmenu-item>给选中行添加后缀</v-contextmenu-item
        ><v-contextmenu-item>给选中行添加相同前后缀</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-submenu title="大小写格式">
        <v-contextmenu-item>修改为大写 (UPPERCASE)</v-contextmenu-item>
        <v-contextmenu-item>修改为小写 (lowercase)</v-contextmenu-item>
        <v-contextmenu-divider />
        <v-contextmenu-item>修改为驼峰 (camelCase)</v-contextmenu-item>
        <v-contextmenu-item>修改为大驼峰 (PascalCase)</v-contextmenu-item>
        <v-contextmenu-item>修改为蛇形 (snake_case)</v-contextmenu-item>
        <v-contextmenu-item>修改为破折号 (dash-case)</v-contextmenu-item>
        <v-contextmenu-item>修改为常量格式 (CONSTANT_CASE)</v-contextmenu-item>
        <v-contextmenu-item>修改为点分割格式 (dot.case)</v-contextmenu-item>
        <v-contextmenu-item>修改为标题格式 (Title Case)</v-contextmenu-item>
        <v-contextmenu-item>修改为句子格式 (Sentence Case)</v-contextmenu-item>
        <v-contextmenu-item>修改为标题格式 (Title Case)</v-contextmenu-item>
        <v-contextmenu-divider />
        <v-contextmenu-item>交换大小写 (sWAP cASE)</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-submenu title="合并/分割">
        <v-contextmenu-item>每两行合并为一行</v-contextmenu-item>
        <v-contextmenu-item>每两行合并为一行并且用空格隔开</v-contextmenu-item>
        <v-contextmenu-item>每两行合并为一行并且用逗号隔开</v-contextmenu-item>
        <v-contextmenu-item>每两行合并为一行并且用分号隔开</v-contextmenu-item>
        <v-contextmenu-item
          >每两行合并为一行并且用自定义符号隔开</v-contextmenu-item
        >
        <v-contextmenu-divider />
        <v-contextmenu-item>每N行合并为一行</v-contextmenu-item>
        <v-contextmenu-item>每N行合并为一行并且用空格隔开</v-contextmenu-item>
        <v-contextmenu-item>每N行合并为一行并且用逗号隔开</v-contextmenu-item>
        <v-contextmenu-item>每N行合并为一行并且用分号隔开</v-contextmenu-item>
        <v-contextmenu-item
          >每N行合并为一行并且用自定义符号隔开</v-contextmenu-item
        >
        <v-contextmenu-divider />
        <v-contextmenu-item>用空格分割行</v-contextmenu-item>
        <v-contextmenu-item>用逗号分割行</v-contextmenu-item>
        <v-contextmenu-item>用分号分割行</v-contextmenu-item>
        <v-contextmenu-item>用自定义符号分割行</v-contextmenu-item>
        <v-contextmenu-divider />
      </v-contextmenu-submenu>

      <v-contextmenu-divider />

      <v-contextmenu-submenu title="排序">
        <v-contextmenu-item>升序 (大小写敏感)</v-contextmenu-item>
        <v-contextmenu-item>降序 (大小写敏感)</v-contextmenu-item>
        <v-contextmenu-item>升序 (大小写不敏感)</v-contextmenu-item>
        <v-contextmenu-item>降序 (大小写不敏感)</v-contextmenu-item>

        <v-contextmenu-divider />
        <v-contextmenu-item>根据长度升序</v-contextmenu-item>
        <v-contextmenu-item>根据长度降序</v-contextmenu-item>
        <v-contextmenu-item>根据单词数量升序</v-contextmenu-item>
        <v-contextmenu-item>根据单词数量降序</v-contextmenu-item>
        <v-contextmenu-divider />
        <v-contextmenu-item>语义化升序</v-contextmenu-item
        ><v-contextmenu-item>语义化降序</v-contextmenu-item>
        <v-contextmenu-divider />
        <v-contextmenu-item>随机顺序</v-contextmenu-item>
        <v-contextmenu-item>反转顺序 (第一行调整为最后一行)</v-contextmenu-item>
      </v-contextmenu-submenu>

      <v-contextmenu-submenu title="删除">
        <v-contextmenu-item>删除重复行 (大小写敏感)</v-contextmenu-item
        ><v-contextmenu-item>删除重复行 (大小写不敏感)</v-contextmenu-item>
        <v-contextmenu-divider />

        <v-contextmenu-item>删除空白字符 (空格,制表符等)</v-contextmenu-item>
        <v-contextmenu-item>删除换行符 (所有内容合并为一行)</v-contextmenu-item>
        <v-contextmenu-item>删除空白字符和换行符</v-contextmenu-item>
        <v-contextmenu-item>将换行符替换为空格</v-contextmenu-item>
        <v-contextmenu-item>将换行符和空白字符替换为空格</v-contextmenu-item>

        <v-contextmenu-divider />
        <v-contextmenu-item>删除空行 (这一行什么都没有)</v-contextmenu-item>
        <v-contextmenu-item>删除多余的空行</v-contextmenu-item>
        <v-contextmenu-item>删除空白行 (有空格等空白字符)</v-contextmenu-item>
        <v-contextmenu-item>删除多余的空白行</v-contextmenu-item>
        <v-contextmenu-divider />

        <v-contextmenu-item>只保留重复行 (大小写敏感)</v-contextmenu-item>
        <v-contextmenu-item>只保留重复行 (大小写不敏感)</v-contextmenu-item>
        <v-contextmenu-item>只保留唯一行 (大小写敏感)</v-contextmenu-item>
        <v-contextmenu-item>只保留唯一行 (大小写不敏感)</v-contextmenu-item>
        <v-contextmenu-divider />
        <v-contextmenu-item>删除控制符</v-contextmenu-item>
      </v-contextmenu-submenu>
    </v-contextmenu>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background-color: rgb(90 167 164 / 20%);
  border: 3px dashed rgb(90 167 164 / 90%);
  border-radius: 8px;
}

:deep(.my-dialog-class) {
  /* 使遮罩层不响应鼠标事件 */
  pointer-events: none;

  .el-dialog {
    /* 使对话框内容响应鼠标事件 */
    pointer-events: auto;
  }
}
</style>
