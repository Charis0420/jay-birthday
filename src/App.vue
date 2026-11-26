<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLocale } from './i18n'

const { locale } = useI18n()

const langs = [
  { code: 'zh', label: '中' },
  { code: 'ko', label: '한' },
  { code: 'ja', label: '日' },
  { code: 'en', label: 'EN' },
]
</script>

<template>
  <div class="relative h-dvh overflow-hidden">
    <header class="absolute inset-x-0 top-0 z-20 bg-cream/90 backdrop-blur">
      <div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <span class="font-semibold tracking-wide">JAY ♡ 2027</span>
        <div class="flex gap-1">
          <button
            v-for="lang in langs"
            :key="lang.code"
            type="button"
            class="rounded-full px-2.5 py-1 text-xs transition"
            :class="
              locale === lang.code
                ? 'bg-rose-soft text-white'
                : 'text-ink-soft hover:text-ink'
            "
            @click="setLocale(lang.code)"
          >
            {{ lang.label }}
          </button>
        </div>
      </div>
    </header>

    <main class="h-full overflow-y-auto snap-y snap-mandatory">
      <RouterView />
    </main>
  </div>
</template>
