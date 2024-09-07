<template>
  <section class="monaco-editor-container" >
    <MonacoEditor
      :init-value="sourceValue"  
    />
  </section>
</template>

<script setup lang="ts">
 import { ref, defineComponent } from "vue";

const sourceValue = ref('123') ;
 
</script>
 