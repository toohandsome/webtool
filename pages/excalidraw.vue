<template>
  <div class="excalidraw">
      <div id="excalidrawApp"></div>
    </div>
</template>

<script setup>
useHead({
  script: [
    { src: "/js/react.js" },
    { src: "/js/react-dom.js" },
    { src: "/js/excalidraw.js"  },
    { src: "/js/showExcalidraw.js", body: true },
  ],
});
</script>
<style>
 html, body {
        height: 100%;
        margin: 0px;
    }
.excalidraw {
  height: 100%;
  width: 100%;
}
#excalidrawApp {
    height: 100%;
    width: 100%;
}
</style>
