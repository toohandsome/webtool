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
import "v-contextmenu/dist/themes/default.css";

import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-static_highlight";
import "ace-builds/src-noconflict/ext-settings_menu";

import { CaretRight, CaretBottom } from '@element-plus/icons-vue';
import { fa } from "element-plus/es/locales.mjs";

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
    const filterDialogVisible = ref(false);
    const showFilterDialog = () => {
      filterDialogVisible.value = true;
    };
    const menuData = ref([
      {
        "name": "筛选/过滤",
        "event": "",
        "sub": [
          { "name": "包含特定文本的行", "event": showFilterDialog },
          { "name": "不包含特定文本的行", "event": showFilterDialog }
        ]
      },
      {
        "name": "前后缀",
        "event": "",
        "sub": [
          { "name": "添加前缀", "event": "" },
          { "name": "添加后缀", "event": "" },
          { "name": "添加前后缀", "event": "" }
        ]
      },
      {
        "name": "大小写格式",
        "event": "",
        "sub": [
          { "name": "修改为大写 (UPPERCASE)", "event": "" },
          { "name": "修改为小写 (lowercase)", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "修改为驼峰 (camelCase)", "event": "" },
          { "name": "修改为大驼峰 (PascalCase)", "event": "" },
          { "name": "修改为蛇形 (snake_case)", "event": "" },
          { "name": "修改为破折号 (dash-case)", "event": "" },
          { "name": "修改为常量格式 (CONSTANT_CASE)", "event": "" },
          { "name": "修改为点分割格式 (dot.case)", "event": "" },
          { "name": "修改为标题格式 (Title Case)", "event": "" },
          { "name": "修改为句子格式 (Sentence Case)", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "交换大小写 (sWAP cASE)", "event": "" }
        ]
      },
      {
        "name": "合并/分割",
        "event": "",
        "sub": [
          { "name": "每两行合并为一行", "event": "" },
          { "name": "每两行合并为一行并且用空格隔开", "event": "" },
          { "name": "每两行合并为一行并且用逗号隔开", "event": "" },
          { "name": "每两行合并为一行并且用分号隔开", "event": "" },
          { "name": "每两行合并为一行并且用自定义符号隔开", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "每N行合并为一行", "event": "" },
          { "name": "每N行合并为一行并且用空格隔开", "event": "" },
          { "name": "每N行合并为一行并且用逗号隔开", "event": "" },
          { "name": "每N行合并为一行并且用分号隔开", "event": "" },
          { "name": "每N行合并为一行并且用自定义符号隔开", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "用空格分割行", "event": "" },
          { "name": "用逗号分割行", "event": "" },
          { "name": "用分号分割行", "event": "" },
          { "name": "用自定义符号分割行", "event": "" },
        ]
      },
      {
        "name": "排序",
        "event": "",
        "sub": [
          { "name": "升序 (大小写敏感)", "event": "" },
          { "name": "降序 (大小写敏感)", "event": "" },
          { "name": "升序 (大小写不敏感)", "event": "" },
          { "name": "降序 (大小写不敏感)", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "根据长度升序", "event": "" },
          { "name": "根据长度降序", "event": "" },
          { "name": "根据单词数量升序", "event": "" },
          { "name": "根据单词数量降序", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "随机顺序 (打乱顺序)", "event": "" },
          { "name": "反转顺序 (第一行调整为最后一行)", "event": "" }
        ]
      },
      {
        "name": "删除",
        "event": "",
        "sub": [
          { "name": "删除重复行 (大小写敏感)", "event": "" },
          { "name": "删除重复行 (大小写不敏感)", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "删除空白字符 (空格,制表符等)", "event": "" },
          { "name": "删除换行符 (所有内容合并为一行)", "event": "" },
          { "name": "删除空白字符和换行符", "event": "" },
          { "name": "将换行符替换为空格", "event": "" },
          { "name": "将换行符和空白字符替换为空格", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "删除空行 (这一行什么都没有)", "event": "" },
          { "name": "删除多余的空行", "event": "" },
          { "name": "删除空白行 (有空格等空白字符)", "event": "" },
          { "name": "删除多余的空白行", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "只保留重复行 (大小写敏感)", "event": "" },
          { "name": "只保留重复行 (大小写不敏感)", "event": "" },
          { "name": "只保留唯一行 (大小写敏感)", "event": "" },
          { "name": "只保留唯一行 (大小写不敏感)", "event": "" },
          { "name": "divider", "event": "" },
          { "name": "删除控制符", "event": "" }
        ]
      }

    ]);
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

    const easyMode = ref(false);
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
<?xml version='1.0' encoding='utf-8'?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
		 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<packaging>jar</packaging>

	<parent>
		<groupId>cn.hutool</groupId>
		<artifactId>hutool-parent</artifactId>
		<version>5.8.25</version>
	</parent>

	<artifactId>hutool-core</artifactId>
	 
	<description>Hutool核心，包括集合、字符串、Bean等工具</description>

	<properties>
		<Automatic-Module-Name>cn.hutool.core</Automatic-Module-Name>
	</properties>
</project>

   package cn.hutool.core.annotation.scanner;

import cn.hutool.core.annotation.AnnotationUtil;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.ObjectUtil;

import java.lang.annotation.Annotation;
import java.lang.annotation.Inherited;
import java.lang.reflect.AnnotatedElement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * <p>注解扫描器，用于从支持的可注解元素上获取所需注解
 *
 * <p>默认提供了以下扫描方式：
 * <ul>
 *     <li>{@link #NOTHING}：什么都不做，什么注解都不扫描；</li>
 *     <li>{@link #DIRECTLY}：扫描元素本身直接声明的注解，包括父类带有{@link Inherited}、被传递到元素上的注解；</li>
 *     <li>
 *         {@link #DIRECTLY_AND_META_ANNOTATION}：扫描元素本身直接声明的注解，包括父类带有{@link Inherited}、被传递到元素上的注解，
 *         以及这些注解的元注解；
 *     </li>
 *     <li>{@link #SUPERCLASS}：扫描元素本身以及父类的层级结构中声明的注解；</li>
 *     <li>{@link #SUPERCLASS_AND_META_ANNOTATION}：扫描元素本身以及父类的层级结构中声明的注解，以及这些注解的元注解；</li>
 *     <li>{@link #INTERFACE}：扫描元素本身以及父接口的层级结构中声明的注解；</li>
 *     <li>{@link #INTERFACE_AND_META_ANNOTATION}：扫描元素本身以及父接口的层级结构中声明的注解，以及这些注解的元注解；</li>
 *     <li>{@link #TYPE_HIERARCHY}：扫描元素本身以及父类、父接口的层级结构中声明的注解；</li>
 *     <li>{@link #TYPE_HIERARCHY_AND_META_ANNOTATION}：扫描元素本身以及父接口、父接口的层级结构中声明的注解，以及这些注解的元注解；</li>
 * </ul>
 *
 * @author huangchengxing
 * @see TypeAnnotationScanner
 * @see MethodAnnotationScanner
 * @see FieldAnnotationScanner
 * @see MetaAnnotationScanner
 * @see ElementAnnotationScanner
 * @see GenericAnnotationScanner
 */
public interface AnnotationScanner {

	// ============================ 预置的扫描器实例 ============================

	/**
	 * 不扫描任何注解
	 */
	AnnotationScanner NOTHING = new EmptyAnnotationScanner();

	/**
	 * 扫描元素本身直接声明的注解，包括父类带有{@link Inherited}、被传递到元素上的注解的扫描器
	 */
	AnnotationScanner DIRECTLY = new GenericAnnotationScanner(false, false, false);

	/**
	 * 扫描元素本身直接声明的注解，包括父类带有{@link Inherited}、被传递到元素上的注解，以及这些注解的元注解的扫描器
	 */
	AnnotationScanner DIRECTLY_AND_META_ANNOTATION = new GenericAnnotationScanner(true, false, false);

	/**
	 * 扫描元素本身以及父类的层级结构中声明的注解的扫描器
	 */
	AnnotationScanner SUPERCLASS = new GenericAnnotationScanner(false, true, false);

	/**
	 * 扫描元素本身以及父类的层级结构中声明的注解，以及这些注解的元注解的扫描器
	 */
	AnnotationScanner SUPERCLASS_AND_META_ANNOTATION = new GenericAnnotationScanner(true, true, false);

	/**
	 * 扫描元素本身以及父接口的层级结构中声明的注解的扫描器
	 */
	AnnotationScanner INTERFACE = new GenericAnnotationScanner(false, false, true);

	/**
	 * 扫描元素本身以及父接口的层级结构中声明的注解，以及这些注解的元注解的扫描器
	 */
	AnnotationScanner INTERFACE_AND_META_ANNOTATION = new GenericAnnotationScanner(true, false, true);

	/**
	 * 扫描元素本身以及父类、父接口的层级结构中声明的注解的扫描器
	 */
	AnnotationScanner TYPE_HIERARCHY = new GenericAnnotationScanner(false, true, true);

	/**
	 * 扫描元素本身以及父接口、父接口的层级结构中声明的注解，以及这些注解的元注解的扫描器
	 */
	AnnotationScanner TYPE_HIERARCHY_AND_META_ANNOTATION = new GenericAnnotationScanner(true, true, true);

	// ============================ 静态方法 ============================

	/**
	 * 给定一组扫描器，使用第一个支持处理该类型元素的扫描器获取元素上可能存在的注解
	 *
	 * @param annotatedEle {@link AnnotatedElement}，可以是Class、Method、Field、Constructor、ReflectPermission
	 * @param scanners     注解扫描器
	 * @return 注解
	 */
	static List<Annotation> scanByAnySupported(AnnotatedElement annotatedEle, AnnotationScanner... scanners) {
		if (ObjectUtil.isNull(annotatedEle) && ArrayUtil.isNotEmpty(scanners)) {
			return Collections.emptyList();
		}
		return Stream.of(scanners)
			.filter(scanner -> scanner.support(annotatedEle))
			.findFirst()
			.map(scanner -> scanner.getAnnotations(annotatedEle))
			.orElseGet(Collections::emptyList);
	}

	/**
	 * 根据指定的扫描器，扫描元素上可能存在的注解
	 *
	 * @param annotatedEle {@link AnnotatedElement}，可以是Class、Method、Field、Constructor、ReflectPermission
	 * @param scanners     注解扫描器
	 * @return 注解
	 */
	static List<Annotation> scanByAllSupported(AnnotatedElement annotatedEle, AnnotationScanner... scanners) {
		if (ObjectUtil.isNull(annotatedEle) && ArrayUtil.isNotEmpty(scanners)) {
			return Collections.emptyList();
		}
		return Stream.of(scanners)
			.map(scanner -> scanner.getAnnotationsIfSupport(annotatedEle))
			.flatMap(Collection::stream)
			.collect(Collectors.toList());
	}

	// ============================ 抽象方法 ============================

	/**
	 * 判断是否支持扫描该注解元素
	 *
	 * @param annotatedEle {@link AnnotatedElement}，可以是Class、Method、Field、Constructor、ReflectPermission
	 * @return 是否支持扫描该注解元素
	 */
	default boolean support(AnnotatedElement annotatedEle) {
		return false;
	}

	/**
	 * 获取注解元素上的全部注解。调用该方法前，需要确保调用{@link #support(AnnotatedElement)}返回为true
	 *
	 * @param annotatedEle {@link AnnotatedElement}，可以是Class、Method、Field、Constructor、ReflectPermission
	 * @return 注解
	 */
	default List<Annotation> getAnnotations(AnnotatedElement annotatedEle) {
		final List<Annotation> annotations = new ArrayList<>();
		scan((index, annotation) -> annotations.add(annotation), annotatedEle, null);
		return annotations;
	}

	/**
	 * 若{@link #support(AnnotatedElement)}返回{@code true}，
	 * 则调用并返回{@link #getAnnotations(AnnotatedElement)}结果，
	 * 否则返回{@link Collections#emptyList()}
	 *
	 * @param annotatedEle {@link AnnotatedElement}，可以是Class、Method、Field、Constructor、ReflectPermission
	 * @return 注解
	 */
	default List<Annotation> getAnnotationsIfSupport(AnnotatedElement annotatedEle) {
		return support(annotatedEle) ? getAnnotations(annotatedEle) : Collections.emptyList();
	}

	/**
	 * 扫描注解元素的层级结构（若存在），然后对获取到的注解和注解对应的层级索引进行处理。
	 * 调用该方法前，需要确保调用{@link #support(AnnotatedElement)}返回为true
	 *
	 * @param consumer     对获取到的注解和注解对应的层级索引的处理
	 * @param annotatedEle {@link AnnotatedElement}，可以是Class、Method、Field、Constructor、ReflectPermission
	 * @param filter       注解过滤器，无法通过过滤器的注解不会被处理。该参数允许为空。
	 */
	default void scan(BiConsumer<Integer, Annotation> consumer, AnnotatedElement annotatedEle, Predicate<Annotation> filter) {
		filter = ObjectUtil.defaultIfNull(filter, (a)->annotation -> true);
		for (final Annotation annotation : annotatedEle.getAnnotations()) {
			if (AnnotationUtil.isNotJdkMateAnnotation(annotation.annotationType()) && filter.test(annotation)) {
				consumer.accept(0, annotation);
			}
		}
	}

	/**
	 * 若{@link #support(AnnotatedElement)}返回{@code true}，则调用{@link #scan(BiConsumer, AnnotatedElement, Predicate)}
	 *
	 * @param consumer     对获取到的注解和注解对应的层级索引的处理
	 * @param annotatedEle {@link AnnotatedElement}，可以是Class、Method、Field、Constructor、ReflectPermission
	 * @param filter       注解过滤器，无法通过过滤器的注解不会被处理。该参数允许为空。
	 */
	default void scanIfSupport(BiConsumer<Integer, Annotation> consumer, AnnotatedElement annotatedEle, Predicate<Annotation> filter) {
		if (support(annotatedEle)) {
			scan(consumer, annotatedEle, filter);
		}
	}

}
# 这是一行注释，读取时应忽略
a,b,c,d
1,2,3,4
# 这是一行注释，读取时应忽略
q,w,e,r,"我是一段
带换行的内容"
a,s,d,f
 
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
    //https://blog.csdn.net/qq_32682301/article/details/128871450#:~:text=mode%EF%BC%9A%E7%BC%96%E8%BE%91%E5%99%A8%E7%9A%84%E6%95%B4%E4%BD%93%E6%A8%A1%E5%BC%8F%E6%88%96%E6%A0%B7%E5%BC%8F%EF%BC%8C%E8%BF%99%E9%87%8C%E5%8F%96%E5%80%BC%E4%B8%BA%20markdown%EF%BC%8C%E8%A1%A8%E6%98%8E%E9%9C%80%E8%A6%81%E7%94%A8%E8%BF%99%E4%B8%AA%E7%BC%96%E8%BE%91%E5%99%A8%E6%9D%A5%E8%BE%93%E5%85%A5%20markdown%E6%96%87%E6%9C%AC%EF%BC%8C%E8%BF%99%E6%A0%B7%E7%BC%96%E8%BE%91%E5%99%A8%E5%B0%B1%E4%BC%9A%E8%BF%9B%E8%A1%8C%E7%9B%B8%E5%BA%94%E7%9A%84%E5%88%9D%E5%A7%8B%E8%AE%BE%E7%BD%AE%E3%80%82
    const editorOptions = ref({
      fontSize: "12px",
      showPrintMargin: false,
      wrapEnabled: true
    });



    const filterStrFun1 = () => {

      if (dialogValue1.value=="") {
        ElMessage({
          type: "error",
          message: `请输入内容`
        });
        return;
      }
      let reg = new RegExp(dialogValue1.value);

      var allText = "";
      if (!filterCheckList.value.includes("case")) {
        reg = new RegExp(dialogValue1.value, "i");
      }

      if (filterCheckList.value.includes("selectd")) {
        console.log(aceEditor.value.getSelectionRange());
      } else {
        allText = editerTxt.value;
      }

      if (filterCheckList.value.includes("reg")) {
        filterTextarea(filterStrFun3, reg, allText);
      } else {
        if (filterCheckList.value.includes("case")) {
          filterTextarea(filterStrFun2, dialogValue1.value, allText);
        } else {
          filterTextarea(filterStrFun4, dialogValue1.value, allText);
        }
      }

    };
    const filterStrFun2 = (str1: string, str2: string) => {
      return str1.indexOf(str2) != -1;
    };
    const filterStrFun4 = (str1: string, str2: string) => {
      return str1.toLocaleLowerCase().indexOf(str2.toLocaleLowerCase()) != -1;
    };
    const filterStrFun3 = (str1: string, reg: RegExp) => {
      return reg.test(str1);
    };
    const filterTextarea = (fun: Function, condition: any, editerStr: string) => {

      const start = performance.now();
      // console.log("editerTxt.value", editerStr);
      var strArr = editerStr.split("\n");
      let finalStr = "";
      let findNum = 0;
      for (let index = 0; index < strArr.length; index++) {
        const element = strArr[index];
        if (fun(element, condition)) {
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
    const searchNext = (searchDirection: string) => {
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
    const searchDialogFocus = (type: string) => {
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
      // aceEditor.value.session.highlight(searchVal.value);
      // aceEditor.value.renderer.updateBackMarkers();
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
      console.log("menuData", menuData.value);
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
      filterCheckList,
      easyMode,
      menuData,
      showFilterDialog
    };
  }
});
</script>

<template>
  <div>

    <el-menu ellipsis mode="horizontal" style="height: 40px;">
      <el-sub-menu v-for="(item, i) in menuData" :index='i + ""' :key="i">
        <template #title>{{ item.name }}</template>

        <div v-for="(item1, index1) in item.sub">
          <el-menu-item :index="i + '-' + index1" v-if="item1.name != 'divider'" @click="item1.event">
            {{ item1.name }}
          </el-menu-item>
          <v-contextmenu-divider v-if="item1.name == 'divider'" />
        </div>
      </el-sub-menu>
    </el-menu>


  </div>
  <div style="height:  calc(100vh - 128px)">
    <VAceEditor ref="myAceEditorRef" v-model:value="editerTxt" v-contextmenu:contextmenu useWorker="true"
      :lang="language" :theme="theme" :options="editorOptions" style="width: 100%; height: 100%" />

  </div>

  <div>
    <el-dialog v-model="searchDialogVisible" :modal="searchDialogModal" :close-on-click-modal="false"
      modal-class="my-dialog-class" width="700" draggable overflow :style="{ opacity: searchDialogOpacity }"
      @focusin="searchDialogFocus('open')" @focusout="searchDialogFocus('close')" style="pointer-events: auto;">
      <div style="display: flex">
        <!-- <Edit style="width: 1em; height: 1em; margin-right: 8px" /> -->
        <!-- <IconifyIconOffline :icon="CaretRight" /> -->
        <el-icon style="margin-right: 5px; margin-top: 8px" @click="showReplace">
          <CaretBottom v-if="replaceVisable" />
          <CaretRight v-if="!replaceVisable" />
        </el-icon>
        <el-text>查找目标：</el-text><el-input v-model="searchVal" style="width: 350px" clearable autofocus />
        <!-- <el-button style="margin-left: 10px" @click="searchCount"
          >计数</el-button
        > -->
        <el-button style="margin-left: 10px" @click="searchNext('up')">上一个</el-button>
        <el-button @click="searchNext('down')">下一个</el-button>
      </div>
      <div v-show="replaceVisable" style="margin-top: 10px; margin-bottom: 10px; margin-left: 18px">
        <el-text>替换内容：</el-text><el-input v-model="replaceVal" style="width: 350px" clearable />
        <el-button style="margin-left: 10px" @click="replaceText">替换</el-button>
        <el-button @click="replaceText('all')">全部替换</el-button>
      </div>
      <div style="margin-top: 10px; margin-bottom: 5px">
        <el-checkbox-group v-model="searchCheckList" @change="searchOptionChange">
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
    <el-dialog v-model="filterDialogVisible" :modal="searchDialogModal" :close-on-click-modal="false"
      modal-class="my-dialog-class" width="500" draggable overflow :style="{ opacity: searchDialogOpacity }"
      title="筛选/过滤条件" @focusin="searchDialogFocus('open')" @focusout="searchDialogFocus('close')"
      style="pointer-events: auto;">
      <div style="display: flex">
        <el-text>内容 ：</el-text><el-input v-model="dialogValue1" style="width: 350px" clearable autofocus />
      </div>

      <div style="margin-top: 10px; margin-bottom: 5px">
        <el-checkbox-group v-model="filterCheckList" @change="searchOptionChange">
          <el-checkbox label="匹配大小写" value="case" />
          <el-checkbox label="正则" value="reg" />
          <el-checkbox disabled label="新编辑器" value="newEditor" />

        </el-checkbox-group>
        <div>
          <el-text>结果 ：</el-text>
          <el-radio-group>
            <el-radio value="copy">复制到剪贴板</el-radio>
            <el-radio label="cut">剪切到剪贴板</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="filterDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="filterDialogVisible = false">预览</el-button>

          <el-button type="danger" @click="filterStrFun1"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-submenu v-for="(item, i) in menuData" :title="item.name">
        <div v-for="(item1, index1) in item.sub">
          <v-contextmenu-item v-if="item1.name != 'divider'" @click="item1.event">
            {{ item1.name }}
          </v-contextmenu-item>
          <v-contextmenu-divider v-if="item1.name == 'divider'" />
        </div>
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
