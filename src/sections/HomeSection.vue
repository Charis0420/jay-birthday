<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 生日目标时间：2027-04-20 00:00（首尔时间，UTC+9）
const TARGET = new Date('2027-04-20T00:00:00+09:00').getTime()

const now = ref(Date.now())
let timer = null

const remaining = computed(() => {
  const diff = Math.max(0, TARGET - now.value)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  }
})

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    id="home"
    class="flex h-[100dvh] snap-start flex-col items-center justify-center overflow-y-auto px-6 pb-10 pt-20 text-center"
  >
    <p class="mb-3 tracking-[0.3em] text-ink-soft">{{ $t('home.subtitle') }}</p>
    <h1 class="text-3xl font-semibold leading-snug md:text-4xl">
      {{ $t('home.title') }}
    </h1>

    <div class="mt-10 w-full max-w-sm rounded-3xl bg-white/60 px-6 py-6">
      <p class="text-sm text-ink-soft">{{ $t('home.countdown') }}</p>
      <div class="mt-4 flex items-end justify-center gap-3">
        <div class="flex flex-col items-center">
          <span class="text-3xl font-semibold tabular-nums">{{ remaining.days }}</span>
          <span class="mt-1 text-xs text-ink-soft">{{ $t('home.days') }}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-semibold tabular-nums">{{ remaining.hours }}</span>
          <span class="mt-1 text-xs text-ink-soft">{{ $t('home.hours') }}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-semibold tabular-nums">{{ remaining.minutes }}</span>
          <span class="mt-1 text-xs text-ink-soft">{{ $t('home.minutes') }}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-semibold tabular-nums">{{ remaining.seconds }}</span>
          <span class="mt-1 text-xs text-ink-soft">{{ $t('home.seconds') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
