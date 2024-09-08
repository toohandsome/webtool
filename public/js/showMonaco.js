const editorOptions = {
    
    autoIndex: false, // 控制是否开启自动索引。当开启时，编辑器会自动创建索引以加速搜索和语义高亮。
    fontSize: 14, // 字体大小
    language: 'javascript', //语言
    readOnly: false, // 是否只读  
    overviewRulerBorder: false, // 滚动是否有边框
    cursorSmoothCaretAnimation: true, // 控制光标平滑动画的开启与关闭。当开启时，光标移动会有平滑的动画效果。
    mouseWheelZoom: true, //设置是否开启鼠标滚轮缩放功能
    folding: true, //控制是否开启代码折叠功能
    automaticLayout: true, // 控制编辑器是否自动调整布局以适应容器大小的变化
    minimap: {
      // 关闭代码缩略图
      enabled: false, // 是否启用预览图
    },
    // scrollbar: {
    //   verticalScrollbarSize: 5, // 垂直滚动条宽度，默认px
    //   horizontalScrollbarSize: 2, // 水平滚动条高度
    // },
    wordWrap: 'on', // 开启自动换行
    roundedSelection: true, // 右侧不显示编辑器预览框
    originalEditable: true, // 是否允许修改原始文本
    scrollBeyondLastLine: false, // 启用该功能，滚动可以在最后一行之后增加一个屏幕大小，默认值为 true
    renderLineHighlight: 'gutter', // 启用当前行高亮显示的呈现
    contextmenu: true, // 双击菜单
    columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
    copyWithSyntaxHighlighting: false, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
    links: false, // 是否点击链接
    selectionHighlight: true,
    lineNumbers: true, //显示行号
    autoClosingBrackets: 'always', // 禁用自动闭合括号功能
    renderIndentGuides: false, // 缩进线的呈现
    suggestOnTriggerCharacters: true, // 用于控制是否在输入触发字符时显示建议
    glyphMargin: false, // 设置是否显示装饰符号边距
    unicodeHighlight: {
      ambiguousCharacters: false, // 禁用 unicode 字符的高亮显示
    },
    stickyScroll: {
      enabled: false, // 取消顶部吸附
    }, 
    quickSuggestions: false,  
    hover: { 
        enabled: false,  // 关闭鼠标提示
        delay: 500,
        sticky: false
    }
  };
  
window.onload = function() {
    // 配置 Monaco Editor 的基本路径
    window.MonacoEnvironment = {
      getWorkerUrl: function (moduleId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          self.MonacoEnvironment = {
            baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.51.0/min/'
          };
          importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.51.0/min/vs/base/worker/workerMain.js');
        `)}`;
      }
    };

    // 加载 Monaco Editor 的核心模块
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.51.0/min/vs' } });
    require(['vs/editor/editor.main'], function() {
      // 创建 Monaco Editor 实例
      var editor = monaco.editor.create(document.getElementById('monacaEditor'), {
        value: testVal,
        language: 'javascript',
        ...editorOptions
      });
      
      //  关闭语法检查
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
        });
    });
  };


const testVal = `[
      {
        "name": "筛选/过滤",
        "event": "",
        "sub": [
          { "name": "包含特定文本的行", "event": showFilterDialog1 },
          { "name": "不包含特定文本的行", "event": showFilterDialog2 }
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

    ]

    console.log('Hello, Ace Editor!');xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
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
}`;