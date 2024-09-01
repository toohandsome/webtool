<template>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/about">关于</NuxtLink></li>
          <li><NuxtLink to="/posts/1">文章1</NuxtLink></li>
          <li><NuxtLink to="/posts/2">文章2</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
      <Style type="text/css" children="body { background-color: write; }" />
    </Head>

    <h1>{{ title }}</h1>
  </div>
  </template>
  <script setup lang="ts">
  const title = ref('你好，世界')

  useHead({
    title: '我的应用',
    meta: [
      { name: 'description', content: '我的神奇网站。' }
    ],
    bodyAttrs: {
      class: 'test'
    },
    script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
  })
  useSeoMeta({
  title: '我的神奇网站',
  ogTitle: '我的神奇网站',
  description: '这是我的神奇网站，让我来告诉你关于它的一切。',
  ogDescription: '这是我的神奇网站，让我来告诉你关于它的一切。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
  </script>