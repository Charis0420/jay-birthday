<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const STORAGE_KEY = 'jay-birthday-fortune'

// 概率池：隐藏款 1/12，其余按权重分布
const POOL = [
  'great',
  'good',
  'good',
  'good',
  'middle',
  'middle',
  'middle',
  'small',
  'small',
  'bad',
  'great',
  'hidden',
]

const phase = ref('idle') // idle | shaking | result
const levelKey = ref(null)

function pickLevel() {
  return POOL[Math.floor(Math.random() * POOL.length)]
}

function draw() {
  if (phase.value === 'shaking') return
  phase.value = 'shaking'
  setTimeout(() => {
    levelKey.value = pickLevel()
    phase.value = 'result'
    localStorage.setItem(STORAGE_KEY, levelKey.value)
  }, 1200)
}

function again() {
  phase.value = 'idle'
  levelKey.value = null
  localStorage.removeItem(STORAGE_KEY)
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    levelKey.value = saved
    phase.value = 'result'
  }
})
</script>

<template>
  <section
    id="fortune"
    class="flex h-[100dvh] snap-start flex-col justify-start overflow-y-auto px-6 pb-10 pt-20"
  >
    <header class="text-center">
      <h2 class="text-2xl font-semibold md:text-3xl">{{ t('fortune.title') }}</h2>
      <p class="mt-2 text-ink-soft">{{ t('fortune.subtitle') }}</p>
    </header>

    <div class="mx-auto mt-10 flex w-full max-w-md flex-col items-center gap-8">
      <div
        class="text-7xl"
        :class="{ shaking: phase === 'shaking' }"
        role="img"
        aria-label="potato"
      >
        🥔
      </div>

      <button
        v-if="phase === 'idle'"
        type="button"
        class="rounded-full bg-rose-soft px-8 py-3 text-white shadow-sm transition hover:opacity-90"
        @click="draw"
      >
        {{ t('fortune.draw') }}
      </button>

      <p v-if="phase === 'shaking'" class="text-ink-soft">
        {{ t('fortune.shaking') }}
      </p>

      <div
        v-if="phase === 'result' && levelKey"
        class="w-full rounded-3xl bg-white/70 p-6 text-center"
        :class="levelKey === 'hidden' ? 'ring-2 ring-rose-soft' : ''"
      >
        <p class="text-xs tracking-widest text-ink-soft">{{ t('fortune.result') }}</p>
        <p class="mt-2 text-2xl font-semibold">
          {{ t(`fortune.levels.${levelKey}.name`) }}
        </p>
        <p class="mt-3 text-sm leading-relaxed text-ink-soft">
          {{ t(`fortune.levels.${levelKey}.text`) }}
        </p>
        <button
          type="button"
          class="mt-6 rounded-full border border-rose-soft px-6 py-2 text-sm text-rose-soft transition hover:bg-blush/40"
          @click="again"
        >
          {{ t('fortune.again') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes potato-shake {
  0%,
  100% {
    transform: rotate(0deg) translateY(0);
  }
  20% {
    transform: rotate(-12deg) translateY(-6px);
  }
  40% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(-8deg) translateY(-3px);
  }
  80% {
    transform: rotate(6deg);
  }
}

.shaking {
  animation: potato-shake 0.3s ease-in-out infinite;
}
</style>
