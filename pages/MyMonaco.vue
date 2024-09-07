<template>
  <section class="monaco-editor-container">
    <MonacoEditor
      :old-value="sourceValue"
      :new-value="targetValue"
      @original-change="originalChange"
    />
  </section>
</template>

<script setup lang="ts">
 import { ref, defineComponent } from "vue";
 
const sourceValue = ref('123')
const targetValue = ref('123aaaaa')

const originalChange = (val: string) => {
    sourceValue.value = val
}
</script>
 