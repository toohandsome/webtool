

<template>
    <div> 
      
  
  <AceWithMenu/>
    </div>
  </template>


<script setup lang="ts">
import { ref, defineComponent } from "vue";

defineOptions({
  name: "Welcome"
}); 
const text = ref(""); 
</script>