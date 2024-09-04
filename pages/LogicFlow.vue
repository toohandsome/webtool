<template>
  <div id="container"></div>

</template>

<script setup>
useHead({
  script: [
    { src: "/js/logicflow.js" },
    { src: "/js/logicflow-ext.js" }, 
    { src: "/js/logicflow-menu.js" }, 
    { src: "/js/logicflow-dndPanel.js" },
    { src: "/js/logicflow-selectionSelect.js" },
    { src: "/js/logicflow-control.js" },
   
    { src: "/js/showLogicflow.js", body: true },
  ],
});
</script>
<style> 
  @import url("~/public/css/logicflow.css");
  @import url("~/public/css/logicflow-ext.css");
</style>
