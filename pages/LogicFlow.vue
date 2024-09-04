<template>
  <div class="container" ref="container"></div>
</template>

<script>
import LogicFlow from "@logicflow/core";
import { Control } from "@logicflow/extension";

import "@logicflow/core/lib/style/index.css"; 

export default {
  mounted() {
    if (process.client) {
      // 初始化 LogicFlow 的代码

      //LogicFlow.use(Control);

      this.lf = new LogicFlow({
        container: this.$refs.container,
        grid: true,
      });
      this.lf.render();
    }
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  height: 500px;
}
</style>
