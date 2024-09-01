<template>

  <div>

    <el-menu ellipsis mode="horizontal" style="height: 50px;" :show-timeout=10>
      <el-menu-item index="1">文本处理</el-menu-item>
      <el-sub-menu index="1">

        <template #title>加解密</template>
        <el-menu-item index="1-1">国密</el-menu-item>
        <div style="max-width: 400px; flex-wrap: wrap;">
          <el-link href="https://element-plus.org" target="_blank" style=" height: 30px; border: 1px solid var(--el-border-color);  border-radius: 0;  margin-top: 20px;" >default</el-link>
 
          <el-button>comments</el-button>
          <el-button>replies</el-button>
          <el-button>comments</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
          <el-button>custom background</el-button>
        </div>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>格式转换</template>
        <el-menu-item index="2-1">pdf转word</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>图片识别</template>
        <el-menu-item index="3-1">item one</el-menu-item>
        <el-menu-item index="3-2">item two</el-menu-item>
        <el-menu-item index="3-3">item three</el-menu-item>
        <el-sub-menu index="3-4" :popper-offset="-1">
          <template #title>override child</template>
          <el-menu-item index="3-4-1">item one</el-menu-item>
          <el-menu-item index="3-4-2">item two</el-menu-item>
          <el-menu-item index="3-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>在线画图</template>
        <el-menu-item index="4-1">流程图</el-menu-item>
        <el-menu-item index="4-2">item two</el-menu-item>
        <el-menu-item index="4-3">item three</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="5">在线笔记</el-menu-item>
    </el-menu>
  </div>
</template>