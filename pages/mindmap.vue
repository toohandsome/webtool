<template>
    <ClientOnly>
        <div id="mindMapContainer" style="height: 500px;width: 100%;"></div>
    </ClientOnly>

</template>
<script setup lang="ts">


import { onMounted } from "vue";
// import MindMap from "simple-mind-map";
// import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'

onMounted(async  () => {
    if (process.client) {
        const { default: MindMap } = await import('simple-mind-map');
        const { default: AssociativeLine } = await import('simple-mind-map/src/plugins/AssociativeLine.js');
        const { default: RichText } = await import('simple-mind-map/src/plugins/RichText.js');
        MindMap.usePlugin(AssociativeLine);
        MindMap.usePlugin(RichText);

        const mindMap = new MindMap({
            el: document.getElementById("mindMapContainer"),
            data: {
                data: {
                    text: "根节点",
                },
                children: [],
            },
        });
        console.log("sss");
    }
});



</script>
<style>
#mindMapContainer * {
    margin: 0;
    padding: 0;
}
</style>