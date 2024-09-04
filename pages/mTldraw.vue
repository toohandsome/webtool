<template>
  <div class="container" ref="container">
    <Tldraw1 /> 
  </div>
</template>

<script  >
import {applyReactInVue, applyPureReactInVue} from 'veaury'

// 这是一个React组件
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import {ref} from 'vue'

export default {
  components: {
    Tldraw1: applyPureReactInVue(Tldraw),
    // Tldraw2: applyReactInVue(Tldraw)
  },
  setup() {
    return {
      foo: ref('Hello!')
    }
  }
}


</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  /* inset: 0 */
}
</style>
