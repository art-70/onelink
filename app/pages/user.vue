<template>
  <div>
    <lazy-templates-simple v-if="data" :acc="data" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" v-else>
      <base-loading class="size-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeData } from '../utils'
import type { Data } from '../types'

const route = useRoute()
const param = route.query.data
const data = ref<Data | null>(null)

useSeoMeta({
  ogUrl: 'https://y-link.netlify.app/',
  title: 'User - yLink',
  ogTitle: 'User - yLink',
  twitterTitle: 'User - yLink',
  description: "User's profile on yLink, where the data is living in the URL.",
  ogDescription: "User's profile on yLink, where the data is living in the URL.",
  twitterDescription: "User's profile on yLink, where the data is living in the URL.",
})
useHead({
  link: [{ rel: 'canonical', href: 'https://y-link.netlify.app/' }],
})
defineOgImageComponent('pergel', {
  headline: 'yLink',
  title: 'User',
  description: "User's profile on yLink, where the data is living in the URL.",
})

onMounted(() => {
  const acc = Array.isArray(param) ? param[0] : param
  if (acc && typeof acc === 'string') {
    try {
      data.value = decodeData(acc)
      if (data.value) {
        useSeoMeta({
          ogUrl: 'https://y-link.netlify.app/user',
          title: `${data.value.name} - YLink`,
          ogTitle: `${data.value.name} - YLink`,
          twitterTitle: `${data.value.name} - YLink`,
          description: data.value.desc,
          ogDescription: data.value.desc,
          twitterDescription: data.value.desc,
          ...(data.value.image
            ? { ogImage: data.value.image, twitterImage: data.value.image }
            : {}),
        })
      }
    } catch (error) {
      console.error('Failed to decode data:', error)
      alert('Invalid data provided in the URL.')
    }
  }
})
</script>
