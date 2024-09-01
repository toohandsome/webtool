

<template>
    <div> 
      
  
  <AceWithMenu/>
    </div>
  </template>


<script setup lang="ts">
import { ref, defineComponent } from "vue";
 
import "v-contextmenu/dist/themes/default.css";
defineOptions({
  name: "Welcome"
});
const checkList = ref(["Value selected and disabled", "Value A"]);
const text = ref("");
const textarea = ref("");
const easyMode = ref(false);
</script>