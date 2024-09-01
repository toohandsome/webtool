

<template>
    <div> 
      
      <el-checkbox-group v-model="checkList">
    <el-checkbox label="Option A" value="Value A" />
    <el-checkbox label="Option B" value="Value B" />
    <el-checkbox label="Option C" value="Value C" />
    <el-checkbox
      label="selected and disabled"
      value="Value selected and disabled"
      disabled
    />
  </el-checkbox-group>

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
</script>