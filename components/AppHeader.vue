<template>
  <div>
    <el-menu ellipsis mode="horizontal" style="height: 50px" :show-timeout="10">
      <el-menu-item index="1">文本处理</el-menu-item>
      <el-sub-menu index="2">
        <template #title>加解密</template>
        <el-menu-item index="2-1">国密</el-menu-item>
        <el-menu-item index="2-1">RSA</el-menu-item>
        <el-menu-item index="2-1">AES</el-menu-item>
      </el-sub-menu>

      <!-- <el-sub-menu index="2">
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
      </el-sub-menu> -->
      <!-- <el-sub-menu index="3">
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
      </el-sub-menu> -->
      <el-sub-menu index="4">
        <template #title>在线画图</template>
        <el-menu-item index="4-1" @click="openExcalidraw"
          >excalidraw</el-menu-item
        >
        <el-menu-item index="4-2" @click="openTldraw">tldraw</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="5" @click="openExcel">在线Excel</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
function openExcel() {
  window.open("/univer?t=" + new Date().getTime());
}
function openExcalidraw() {
  window.open("/excalidraw?t=" + new Date().getTime());
}
function openTldraw() {
  window.open("/mTldraw?t=" + new Date().getTime());
}
</script>
