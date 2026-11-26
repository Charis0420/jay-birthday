<script setup>
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
const nodes = tm('timeline.nodes')
</script>

<template>
  <section
    id="timeline"
    class="flex h-[100dvh] snap-start flex-col justify-start overflow-y-auto px-6 pb-10 pt-20"
  >
    <header class="px-6 text-center">
      <h2 class="text-2xl font-semibold md:text-3xl">{{ $t('timeline.title') }}</h2>
      <p class="mt-2 text-ink-soft">{{ $t('timeline.subtitle') }}</p>
    </header>

    <div class="mx-auto mt-10 w-full max-w-md px-6">
      <div v-for="(node, index) in nodes" :key="index" class="relative pl-8">
        <!-- 串联竖线（最后一个节点不画） -->
        <span
          v-if="index < nodes.length - 1"
          class="absolute left-[7px] top-5 h-[calc(100%-1.25rem)] w-px bg-blush"
        ></span>
        <!-- 节点圆点 -->
        <span
          class="absolute left-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-soft ring-4 ring-blush/40"
        ></span>

        <article class="mb-6 rounded-3xl bg-white/70 p-5 shadow-sm">
          <div class="flex items-center gap-2 text-rose-soft">
            <span class="text-xl">🎸</span>
            <span class="text-sm font-semibold">{{ node.date }}</span>
          </div>
          <h3 class="mt-3 text-lg font-semibold">{{ node.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ node.desc }}</p>
          <span class="mt-4 inline-block text-xl">🐈</span>
        </article>
      </div>
    </div>
  </section>
</template>
