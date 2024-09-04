<template>
    <div id="app" style="height: calc(100vh - 87px);overflow-y: scroll"></div>
  </template>
  
  <script setup>
  

  useHead({
    // style:[
    // { href: "/css/univer.css" },
    // ],
    script: [
      { src: "/js/univer.js" },
      { src: "/js/univer-lang-zh.js" } ,
      { src: "/js/showUniver.js", body: true } 
    ],
  });
  </script>
  <style> 
  @import url("~/public/css/univer.css");

  </style>
  