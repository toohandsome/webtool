<template>
  <div id="monacaEditor" style="height: 500px;"> 
    </div>
</template>

<script setup>
useHead({
  script: [
    { src: "/js/monaca-loader.js" },
    // { src: "/js/monaco-workerMain.js" }, 
    { src: "/js/showMonaco.js", body: true },
  ],
});
</script>
<style>
  @import url("~/public/css/monaco.css");
 html, body {
        height: 100%;
        margin: 0px;
    }
#monacaEditor {
  height: 100%;
  width: 100%;
} 
</style> 