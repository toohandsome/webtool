<template>
  <div id="container"></div>

</template>

<script setup>
useHead({
  script: [
     
    { src: "/js/logicflow-control.js" },
   
    { src: "/js/showLogicflow.js", body: true },
  ],
});
</script>
<style> 
  @import url("~/public/css/logicflow.css");
  
</style>
